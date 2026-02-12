import { useState, useEffect, useCallback } from "react";
import {
  AlertCircle,
  CheckCircle,
  Loader,
  HeartIcon,
  ChevronRight,
  ChevronLeft,
  CheckIcon,
} from "lucide-react";
import api from "../utils/api";
import ResultsScreen from "./ResultsScreen";
import styles from "./SymptomChecker.module.css";

// ── Static image imports (Vite / CRA resolve these at build time) ──────────────
import herpes from "../assets/Genetial-herps.png";
import scabies from "../assets/Genital-scabies2.png";
import warts from "../assets/Genital-warts.png";
import ulcer from "../assets/ulcer.png";
import smooth from "../assets/smooth-skin.png";
import bumpy from "../assets/bumpy-skin.png";
// import rough from "../assets/rough-skin.png";
import inflamed from "../assets/inflamed-skin.png";
import swollen from "../assets/swollen-skin.png";

/** Maps imageType keys → imported image URLs */
export const referenceImagesMap = {
  herpes,
  scabies,
  warts,
  ulcer,
  smooth,
  bumpy,

  inflamed,
  swollen,
};

/**
 * Human-readable clinical label for each imageType.
 * Sent alongside the image so Gemini has dual grounding.
 */
const IMAGE_LABELS = {
  herpes:   "Genital herpes – fluid-filled blisters (HSV)",
  warts:    "Genital warts – cauliflower-like growths (HPV)",
  scabies:  "Scabies – parasitic burrow-track rash",
  ulcer:    "Ulcer / open sore – requires clinical evaluation",
  smooth:   "Smooth skin – no visible lesion",
  bumpy:    "Small raised bumps",
  // rough:    "Rough / textured skin surface",
  inflamed: "Red or inflamed skin",
  swollen:  "Swollen area",
};

// ─────────────────────────────────────────────────────────────────────────────

const SymptomChecker = () => {
  const [questions, setQuestions]             = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses]             = useState({});
  const [loading, setLoading]                 = useState(false);
  const [result, setResult]                   = useState(null);
  const [error, setError]                     = useState("");

  /**
   * selectedImages: Array of { imageType, label, blobUrl }
   * We store the resolved blob URL so the backend can fetch the actual bytes.
   */
  const [selectedImages, setSelectedImages] = useState([]);
  const [showRefNotice, setShowRefNotice]   = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data } = await api.get("/symptoms/questions");
      setQuestions(data);
    } catch {
      setError("Failed to load questions. Please try again.");
    }
  };

  // ── Answer handlers ─────────────────────────────────────────────────────────

  const handleAnswer = (answer) => {
    const question = questions[currentQuestion];

    if (question.multiselect) {
      const prev    = responses[question.id] || [];
      const updated = prev.includes(answer)
        ? prev.filter((a) => a !== answer)
        : [...prev, answer];
      setResponses({ ...responses, [question.id]: updated });
    } else {
      setResponses({ ...responses, [question.id]: answer });

      if (question.type === "yes-no") {
        setShowRefNotice(answer === "yes");
      }
    }
  };

  /**
   * Called when the user clicks a reference image card.
   *
   * Records:
   *   - The response value for this question
   *   - The imageType + label in selectedImages (used for multimodal payload)
   */
  const handleImageSelection = useCallback((imageType) => {
    const question = questions[currentQuestion];
    setResponses((prev) => ({ ...prev, [question.id]: imageType }));

    // Avoid duplicates – replace previous selection for the same question
    setSelectedImages((prev) => {
      const filtered = prev.filter((img) => img.questionId !== question.id);
      if (imageType === "none") return filtered; // "none" carries no image
      return [
        ...filtered,
        {
          questionId: question.id,
          imageType,
          label: IMAGE_LABELS[imageType] || imageType,
          // blobUrl is the Vite-resolved URL; the backend reads the file from disk
          blobUrl: referenceImagesMap[imageType] || null,
        },
      ];
    });
  }, [questions, currentQuestion]);

  // ── Navigation ──────────────────────────────────────────────────────────────

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
    } else {
      submitResponses();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((q) => q - 1);
      const prevQ = questions[currentQuestion - 1];
      if (prevQ?.id === "referenceImages") {
        setShowRefNotice(responses[prevQ.id] === "yes");
      }
    }
  };

  // ── Submission ──────────────────────────────────────────────────────────────

  /**
   * Builds the request payload.
   *
   * selectedReferenceImages – string array of imageType keys (for the backend
   *   to load files from disk and build inline Gemini parts).
   * selectedImageLabels – parallel array of human-readable labels.
   *
   * Sending the imageType keys (not raw base64) keeps the HTTP payload small.
   * The backend resolves the actual file bytes before calling Gemini.
   */
  const submitResponses = async () => {
    setLoading(true);
    setError("");

    try {
      const enrichedResponses = {
        ...responses,
        selectedReferenceImages: selectedImages.map((img) => img.imageType),
        selectedImageLabels:     selectedImages.map((img) => img.label),
      };

      const { data } = await api.post("/symptoms/analyze", {
        responses: enrichedResponses,
      });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to analyze symptoms");
    } finally {
      setLoading(false);
    }
  };

  // ── Reset ───────────────────────────────────────────────────────────────────

  const restart = () => {
    setCurrentQuestion(0);
    setResponses({});
    setResult(null);
    setError("");
    setSelectedImages([]);
    setShowRefNotice(false);
  };

  // ── Loading / Result screens ────────────────────────────────────────────────

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <Loader className={styles.spinner} size={48} />
          <p>Analyzing your responses…</p>
          <p className={styles.loadingSubtext}>Generating personalized health insights</p>
        </div>
      </div>
    );
  }

  if (result) {
    return <ResultsScreen result={result} onRestart={restart} />;
  }

  if (questions.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <Loader className={styles.spinner} size={48} />
          <p>Loading assessment…</p>
        </div>
      </div>
    );
  }

  // ── Question render ─────────────────────────────────────────────────────────

  const question       = questions[currentQuestion];
  const progress       = Math.round((currentQuestion / questions.length) * 100);
  const isMultiselect  = question.multiselect;
  const currentAnswers = responses[question.id] || [];
  const canProceed     =
    responses[question.id] !== undefined &&
    responses[question.id] !== "" &&
    (!isMultiselect || currentAnswers.length > 0);

  const showingImages = responses.referenceImages === "yes";

  return (
    <div className={styles.container}>
      <div className={styles.checker}>

        {/* Progress */}
        <div className={styles.progressSection}>
          <div className={styles.progressInfo}>
            <span className={styles.progressText}>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className={styles.progressPercent}>{progress}% complete</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question card */}
        <div className={styles.questionCard}>
          {question?.sensitive && (
            <div className={styles.sensitiveAlert}>
              <HeartIcon size={18} />
              <span>{question.sensitiveMessage}</span>
            </div>
          )}

          <h2 className={styles.question}>{question?.question}</h2>

          <div className={styles.answers}>

            {/* yes-no */}
            {question?.type === "yes-no" && (
              <>
                <button
                  onClick={() => handleAnswer("yes")}
                  className={`${styles.answerButton} ${responses[question.id] === "yes" ? styles.selected : ""}`}
                >
                  Yes, show me reference images
                </button>
                <button
                  onClick={() => handleAnswer("no")}
                  className={`${styles.answerButton} ${responses[question.id] === "no" ? styles.selected : ""}`}
                >
                  No, I prefer text descriptions only
                </button>
              </>
            )}

            {/* free text */}
            {question?.type === "text" && (
              <textarea
                placeholder={question.placeholder}
                value={responses[question.id] || ""}
                onChange={(e) =>
                  setResponses({ ...responses, [question.id]: e.target.value })
                }
                className={styles.textInput}
                rows="4"
              />
            )}

            {/* conditional – image grid or text buttons depending on user preference */}
            {question?.type === "conditional" && (
              showingImages ? (
                <div className={styles.imageSelectionGrid}>
                  {question.imageOptions?.map((option) => {
                    const imageSrc = referenceImagesMap[option.imageType];
                    const isSelected = responses[question.id] === option.value;

                    return (
                      <div
                        key={option.value}
                        onClick={() => handleImageSelection(option.value)}
                        className={`${styles.imageOptionCard} ${isSelected ? styles.selectedImageOption : ""}`}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && handleImageSelection(option.value)}
                        aria-pressed={isSelected}
                        aria-label={option.label}
                      >
                        <div className={styles.imageWrapper}>
                          {imageSrc ? (
                            <img
                              src={imageSrc}
                              alt={IMAGE_LABELS[option.imageType] || option.label}
                              className={styles.optionImage}
                            />
                          ) : (
                            <div className={styles.imagePlaceholder}>
                              <span>{option.label}</span>
                            </div>
                          )}
                        </div>
                        <div className={styles.imageOptionLabel}>{option.label}</div>
                        {isSelected && (
                          <div className={styles.selectedCheckmark}>
                            <CheckIcon size={18} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                question.textOptions?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className={`${styles.answerButton} ${responses[question.id] === option ? styles.selected : ""}`}
                  >
                    {option}
                  </button>
                ))
              )
            )}

            {/* image-selection (explicit type) */}
            {question?.type === "image-selection" && (
              <div className={styles.imageSelectionGrid}>
                {question.options?.map((option) => {
                  const imageSrc  = referenceImagesMap[option.imageType];
                  const isSelected = responses[question.id] === option.value;

                  return (
                    <div
                      key={option.value}
                      onClick={() => handleImageSelection(option.value)}
                      className={`${styles.imageOptionCard} ${isSelected ? styles.selectedImageOption : ""}`}
                    >
                      <div className={styles.imageWrapper}>
                        {imageSrc ? (
                          <img src={imageSrc} alt={option.label} className={styles.optionImage} />
                        ) : (
                          <div className={styles.imagePlaceholder}><span>{option.label}</span></div>
                        )}
                      </div>
                      <div className={styles.imageOptionLabel}>{option.label}</div>
                      {isSelected && (
                        <div className={styles.selectedCheckmark}><CheckCircle size={24} /></div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* standard multiple-choice */}
            {question?.type === "multiple-choice" &&
              question.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`${styles.answerButton} ${
                    isMultiselect
                      ? currentAnswers.includes(option) ? styles.selected : ""
                      : responses[question.id] === option ? styles.selected : ""
                  }`}
                >
                  {option}
                </button>
              ))
            }
          </div>

          {question?.helpText && (
            <p className={styles.helpText}>{question.helpText}</p>
          )}

          {(showRefNotice || (responses.referenceImages === "yes" && currentQuestion > 7)) && (
            <div className={styles.referenceImagesNotice}>
              <AlertCircle size={18} className={styles.noticeIcon} />
              <div className={styles.noticeContent}>
                <strong>Reference Images Enabled</strong>
                <p>You'll see medical reference images to help identify symptoms. These are for educational purposes only.</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className={styles.navigationButtons}>
          <button
            onClick={handleBack}
            className={styles.backButton}
            disabled={currentQuestion === 0}
          >
            <ChevronLeft size={18} /> Back
          </button>
          <button onClick={handleNext} className={styles.continueButton}>
            {currentQuestion < questions.length - 1 ? "Continue" : "Submit"}
            <ChevronRight size={18} />
          </button>
        </div>

        {error && (
          <div className={styles.errorAlert}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <div className={styles.privacyNotice}>
          <span>Your responses are anonymous and help us provide better recommendations</span>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;