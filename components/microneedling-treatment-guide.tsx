"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCcw, ChevronLeft, ChevronRight, Clock, CheckCircle, Trophy, Star, Sparkles, Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface TreatmentStep {
  id: number
  title: string
  duration: string
  image: string
  video?: string // Added optional video property
  description: string
  benefits: string[]
}

const treatmentSteps: TreatmentStep[] = [
  {
    id: 1,
    title: "Determination of eyebrow starting points",
    duration: "1min 10s",
    image: "/images/step 1.png",
    video: "/videos/step 1.mov",
    description: "Using a pencil and a surgical ruler, the first step is to locate the exact center of the face, between the two eyes. A vertical line is drawn to mark this center. Then, using the ruler vertically, parallel lines are drawn to mark the starting point of each eyebrow, typically aligned with the bridge of the nose.",
    benefits: ["Precise location", "Perfect symmetry", "Solid foundation"],
  },
  {
    id: 2,
    title: "Marking the eyebrow end point",
    duration: "25s",
    image: "/images/step 2.png",
    video: "/videos/step 2.mov",
    description: "Using the ruler as a guide, a diagonal line is drawn from the (simulated) base of the nostril, passing through the outer corner of the eye. The point where this line crosses the eyebrow arch determines the ideal end point of the eyebrow tail. This step is repeated symmetrically for the other eyebrow.",
    benefits: ["Precise end point", "Optimal length", "Symmetry assured"],
  },
  {
    id: 3,
    title: "Creation of the baseline and identification of key points",
    duration: "1min 40s",
    image: "/images/step 3.png",
    video: "/videos/step 3.mov",
    description: "A horizontal baseline is drawn to connect the starting and ending points of the eyebrow, thus defining the lower boundary. Then, reference points are marked along this line and above the eye to identify key areas, including the beginning of the eyebrow body, the highest point of the arch, and the end of the tail.",
    benefits: ["Defined baseline", "Precise reference points", "Clear structure"],
  },
  {
    id: 4,
    title: "Definition of eyebrow thickness",
    duration: "10s",
    image: "/images/step 4.png",
    video: "/videos/step 4.mov",
    description: "Points are marked vertically above the starting points and body of the eyebrow to establish the desired thickness. This measurement is crucial to ensure that both eyebrows will have uniform and symmetrical thickness.",
    benefits: ["Uniform thickness", "Symmetry guaranteed", "Perfect proportion"],
  },
  {
    id: 5,
    title: "Drawing of the eyebrow lower line",
    duration: "40s",
    image: "/images/step 5.png",
    video: "/videos/step 5.mov",
    description: "The lower reference points, marked during previous steps, are carefully connected using the ruler. This action creates a sharp and defined lower line, forming the base of the eyebrow's final shape, from the head to the tail.",
    benefits: ["Sharp lower line", "Defined base", "Structured shape"],
  },
  {
    id: 6,
    title: "Drawing of the eyebrow upper body line",
    duration: "1min",
    image: "/images/step 6.png",
    video: "/videos/step 6.mov",
    description: "Using the ruler, the upper points of the eyebrow head are connected to the highest point of the arch. This line defines the upper edge of the eyebrow body and establishes the arch angle, a key element for facial expression.",
    benefits: ["Defined upper edge", "Optimal arch angle", "Facial expression"],
  },
  {
    id: 7,
    title: "Drawing of the eyebrow tail (upper line)",
    duration: "35s",
    image: "/images/step 7.png",
    video: "/videos/step 7.mov",
    description: "The highest point of the arch is connected to the end point of the eyebrow that was marked in step 2. This descending line completes the upper contour of the eyebrow and creates a tapered and elegant tail.",
    benefits: ["Tapered tail", "Defined upper contour", "Elegance assured"],
  },
  {
    id: 8,
    title: "Finalization of the complete eyebrow contour",
    duration: "1min 5s",
    image: "/images/step 8.png",
    video: "/videos/step 8.mov",
    description: "All guide lines are now connected to form a complete and closed contour for each eyebrow. This step allows visualization of the final shape and verification of overall symmetry before proceeding to filling. The pencil is used to reinforce and clarify the entire contour.",
    benefits: ["Complete contour", "Symmetry verified", "Final shape visualized"],
  },
  {
    id: 9,
    title: "Refinement of lines and angles",
    duration: "45s",
    image: "/images/step 9.png",
    video: "/videos/step 9.mov",
    description: "This step involves reviewing and perfecting the traced shape. The ruler is used to check the angles and straightness of the lines, particularly those of the tail and base of the eyebrow. Small adjustments are made to ensure an impeccable and precise shape.",
    benefits: ["Perfect lines", "Precise angles", "Impeccable shape"],
  },
  {
    id: 10,
    title: "Filling of the shape for visualization",
    duration: "1min 5s",
    image: "/images/step 10.png",
    video: "/videos/step 10.mov",
    description: "The eyebrow contour is completely filled with the pencil. This technique simulates the appearance of the eyebrow once microblading is completed. It provides a clear visualization of the shape, weight, and balance of the eyebrow relative to the eye and other facial features.",
    benefits: ["Clear visualization", "Realistic simulation", "Balance evaluated"],
  },
  {
    id: 11,
    title: "Filling of the second eyebrow for symmetry",
    duration: "45s",
    image: "/images/step 11.png",
    video: "/videos/step 11.mov",
    description: "Using the same pencil, the contour of the second eyebrow is completely filled. This step is essential for visual verification. Having both eyebrows fully shaded allows the artist to compare their shape, size, and overall balance, and make final corrections before moving to the pigmentation step.",
    benefits: ["Symmetry verified", "Visual comparison", "Possible corrections"],
  },
  {
    id: 12,
    title: "Cleaning of contours for sharp definition",
    duration: "1min 20s",
    image: "/images/step 12.png",
    video: "/videos/step 12.mov",
    description: "With a clean wipe and cotton swabs, excess pencil and guide lines around the drawn eyebrows are carefully erased. This cleaning step is crucial as it reveals the final and precise shape of the eyebrows. It allows a final evaluation of symmetry without any visual distraction.",
    benefits: ["Final shape revealed", "Precise cleaning", "Clear evaluation"],
  },
  {
    id: 13,
    title: "Verification of the traced shape",
    duration: "10s",
    image: "/images/step 13.png",
    video: "/videos/step 13.mov",
    description: "A wooden stick is used to gently scratch the pencil inside the shape. This technique allows verification of the sharpness of contour lines directly on the silicone skin and ensures the shape is well defined before final cleaning.",
    benefits: ["Sharpness verified", "Defined shape", "Precise contour"],
  },
  {
    id: 14,
    title: "Cleaning of the internal work area",
    duration: "55s",
    image: "/images/step 14.png",
    video: "/videos/step 14.mov",
    description: "Using a cotton swab, the pencil filling inside the eyebrow contour is gently removed. The goal is to leave only the outer contour. This contour will serve as a precise guide for microblading stroke placement, ensuring each stroke stays within the boundaries of the agreed shape.",
    benefits: ["Clean contour", "Precise guide", "Optimal placement"],
  },
  {
    id: 15,
    title: "Pigment preparation",
    duration: "15s",
    image: "/images/step 15.png",
    video: "/videos/step 15.mov",
    description: "The artist uses a tool to take a small amount of microblading pigment and deposit it into a sterile pigment ring. Wearing the pigment ring on the finger allows quick and efficient access to the pigment during the procedure, thus optimizing workflow.",
    benefits: ["Quick access", "Optimized workflow", "Sterility assured"],
  },
  {
    id: 16,
    title: "Assembly of the microblading tool",
    duration: "30s",
    image: "/images/step 16.png",
    video: "/videos/step 16.mov",
    description: "A sterile, single-use microblading blade is removed from its protective packaging. It is then carefully inserted into the blade holder of the manual stylus. Adherence to hygiene standards during this step is fundamental to ensure safety.",
    benefits: ["Hygiene respected", "Safety guaranteed", "Tool ready"],
  },
  {
    id: 17,
    title: "Securing the blade in the stylus",
    duration: "15s",
    image: "/images/step 17.png",
    video: "/videos/step 17.mov",
    description: "The tightening mechanism of the microblading stylus is firmly screwed to secure the blade in place. It is imperative to ensure the blade is stable and does not move. A well-secured blade is essential to guarantee safety, control, and stroke precision.",
    benefits: ["Stable blade", "Optimal control", "Precision assured"],
  },
  {
    id: 18,
    title: "Creation of the first hairs at the eyebrow head",
    duration: "1min 45s",
    image: "/images/step 18.png",
    video: "/videos/step 18.mov",
    description: "After dipping the blade in the pigment, the artist begins practical work by creating the first hair strokes at the eyebrow head. The incisions are made carefully inside the contour, following a pattern that mimics the natural direction of hair growth in this area.",
    benefits: ["First incisions", "Natural direction", "Precise technique"],
  },
  {
    id: 19,
    title: "Creation of body hairs and the transition line (Spine)",
    duration: "1min 40s",
    image: "/images/step 19.png",
    video: "/videos/step 19.mov",
    description: "The artist continues to implant hair strokes while progressing along the eyebrow body toward the arch. The technique focuses on creating the 'spine', the area where upper and lower strokes meet. The strokes are drawn with a slight curvature for a hyper-realistic result.",
    benefits: ["Spine created", "Hyper-realistic result", "Natural curvature"],
  },
  {
    id: 20,
    title: "Finalization of strokes and transition to the second eyebrow",
    duration: "20s",
    image: "/images/step 20.png",
    video: "/videos/step 20.mov",
    description: "The last strokes are added to complete the pattern on the first eyebrow. The artist then moves on to starting the first strokes on the second eyebrow. This rapid transition helps maintain consistency in gesture and pressure, thus promoting a symmetrical final result.",
    benefits: ["Complete pattern", "Smooth transition", "Symmetry maintained"],
  },
  {
    id: 21,
    title: "Revealing the strokes of the second eyebrow",
    duration: "20s",
    image: "/images/step 21.png",
    video: "/videos/step 21.mov",
    description: "After the first pass of strokes and pigment application, the excess is cleaned from the second eyebrow (the lower one on the mannequin). This action reveals the fundamental strokes, allowing direct comparison of symmetry, depth, and pattern with the first eyebrow already cleaned.",
    benefits: ["Strokes revealed", "Direct comparison", "Symmetry evaluated"],
  },
  {
    id: 22,
    title: "Final cleaning of the first pass",
    duration: "15s",
    image: "/images/step 22.png",
    video: "/videos/step 22.mov",
    description: "The artist proceeds with a final and thorough cleaning of both eyebrows and the surrounding area. The goal is to eliminate any pigment residue from the surface, ensuring that the strokes are sharp and perfectly visible for evaluation before starting the second pass.",
    benefits: ["Thorough cleaning", "Sharp strokes", "Clear evaluation"],
  },
  {
    id: 23,
    title: "Adding density to the second eyebrow (Second Pass)",
    duration: "1min 20s",
    image: "/images/step 23.png",
    video: "/videos/step 23.mov",
    description: "The second pass begins, focusing on the lower eyebrow. The artist adds finer and additional strokes between the initial strokes. This step is essential to build density, create a volume and dimension effect, and perfect the overall fullness of the eyebrow shape.",
    benefits: ["Increased density", "Volume created", "Perfect fullness"],
  },
  {
    id: 24,
    title: "Adding density to the first eyebrow (Second Pass)",
    duration: "15s",
    image: "/images/step 24.png",
    video: "/videos/step 24.mov",
    description: "To guarantee perfect symmetry, the artist now performs the second pass on the upper eyebrow. The objective is to reproduce the same density and stroke pattern as on the lower eyebrow, ensuring that both eyebrows have a consistent and balanced final appearance.",
    benefits: ["Perfect symmetry", "Uniform density", "Consistency assured"],
  },
  {
    id: 25,
    title: "Visualization of the completed upper eyebrow",
    duration: "10s",
    image: "/images/step 25.png",
    video: "/videos/step 25.mov",
    description: "This view shows the upper eyebrow immediately after finishing the second pass. The added density is now clearly visible, and its appearance matches that of the already completed lower eyebrow, confirming the achievement of a harmonious result.",
    benefits: ["Visible density", "Perfect match", "Harmonious result"],
  },
  {
    id: 26,
    title: "Final inspection of completed work",
    duration: "5s",
    image: "/images/step 26.png",
    video: "/videos/step 26.mov",
    description: "A final overview of the practice mannequin presents the two completed eyebrows side by side. This is the culmination of the exercise, allowing a final evaluation of symmetry, shape, stroke quality, and overall aesthetic result.",
    benefits: ["Overall view", "Final evaluation", "Aesthetic result"],
  },
]

export default function MicroneedlingTreatmentGuide() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showCompletion, setShowCompletion] = useState(false)
  const [showMobileDetails, setShowMobileDetails] = useState(false)
  const [showFullScreenVideo, setShowFullScreenVideo] = useState(false)
  const [showFullScreenImage, setShowFullScreenImage] = useState(false)

  // Preload next few steps' media for faster loading
  useEffect(() => {
    const preloadMedia = (stepIndex: number) => {
      const step = treatmentSteps[stepIndex]
      if (!step) return

      // Preload image using native Image API
      if (step.image) {
        const img = document.createElement('img')
        img.src = step.image
      }

      // Preload video
      if (step.video) {
        const video = document.createElement('video')
        video.preload = 'auto'
        video.src = step.video
      }
    }

    // Preload current and next 2 steps
    for (let i = currentStep; i <= Math.min(currentStep + 2, treatmentSteps.length - 1); i++) {
      preloadMedia(i)
    }
  }, [currentStep])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (currentStep < treatmentSteps.length - 1) {
              setCurrentStep((prevStep) => prevStep + 1)
              return 0
            } else {
              setIsPlaying(false)
              setShowCompletion(true)
              return 100
            }
          }
          return prev + 2
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentStep])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setProgress(0)
    setShowCompletion(false)
    setShowMobileDetails(false)
    setShowFullScreenVideo(false)
    setShowFullScreenImage(false)
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    setProgress(0)
    setIsPlaying(false)
    setShowCompletion(false)
    setShowMobileDetails(false)
    setShowFullScreenVideo(false)
    setShowFullScreenImage(false)
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setProgress(0)
      setIsPlaying(false)
      setShowCompletion(false)
      setShowMobileDetails(false)
      setShowFullScreenVideo(false)
      setShowFullScreenImage(false)
    }
  }

  const handleNext = () => {
    if (currentStep < treatmentSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      setProgress(0)
      setIsPlaying(false)
      setShowCompletion(false)
      setShowMobileDetails(false)
      setShowFullScreenVideo(false)
      setShowFullScreenImage(false)
    }
  }

  const currentStepData = treatmentSteps[currentStep]

  const CompletionAnimation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 bg-gradient-to-br from-blue-50 to-violet-100 rounded-2xl flex flex-col items-center justify-center z-10"
    >
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * 400 - 200,
            y: Math.random() * 300 - 150,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -50, -100],
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 3,
          }}
        >
          <Sparkles className="text-violet-400 w-4 h-4" />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-6"
      >
        <div className="relative">
          <Trophy className="w-20 h-20 text-violet-500" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute -top-2 -right-2"
          >
            <Star className="w-8 h-8 text-violet-400" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-saeada text-blue-900 mb-3">Congratulations!</h2>
        <p className="text-lg md:text-xl font-quicksand text-blue-800 mb-2">
          Practice completed successfully!
        </p>
        <p className="text-base font-quicksand text-blue-700 mb-4">All steps have been completed</p>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mx-4">
          <p className="text-sm font-quicksand text-gray-600 mb-1">Training carried out with</p>
          <h3 className="text-xl font-bold font-saeada text-brand-gradient">Guide Professionnel Microblading</h3>
          <p className="text-xs font-quicksand text-gray-500 mt-1">Certified method • Silicone mannequin</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex gap-2 md:gap-3 mt-6 flex-wrap justify-center"
      >
        <div className="bg-green-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
          26/26 Steps
        </div>
        <div className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
          45 Minutes
        </div>
        <div className="bg-purple-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
          Certified
        </div>
        <div className="bg-pink-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
          Professional
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8"
      >
        <Button
          onClick={handleReset}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-bold rounded-full"
        >
          Recommencer
        </Button>
      </motion.div>
    </motion.div>
  )

  return (
    <div className="w-full max-w-7xl mx-auto p-2 md:p-4">
      <AnimatePresence>
        {showFullScreenVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
          >
            <div className="absolute top-4 left-4 z-10">
              <Button
                onClick={() => setShowFullScreenVideo(false)}
                className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-xs md:text-sm font-bold"
              >
                <ChevronLeft size={20} />
                Retour au guide
              </Button>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
              <div className="w-full max-w-6xl">
                <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                  <iframe
                    src="https://player.vimeo.com/video/1115956913?badge=0&autopause=0&player_id=0&app_id=58479"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    title="microblading_tutorial_for_beginners___e-lumy_digital_beauty_academy (1080p)"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-violet-50 p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <h1 className="text-xl sm:text-2xl font-bold font-saeada text-gray-800">
                Practice!
              </h1>
              <div className="flex flex-wrap gap-2 text-sm font-quicksand text-gray-600">
                <span>Training on silicone mannequin</span>
                <span className="hidden sm:inline">•</span>
                <span>26 essential steps</span>
                <span className="hidden sm:inline">•</span>
                <span>Before client practice</span>
                <span className="hidden sm:inline">•</span>
                <span>Required equipment</span>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-xl sm:text-2xl font-bold font-saeada text-gray-800">
                {currentStep + 1}/{treatmentSteps.length}
              </span>
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                <Clock size={14} className="sm:w-4 sm:h-4" />
                <span className="text-sm sm:text-base font-semibold font-quicksand text-gray-700">45min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-quicksand text-gray-600">Progression de la formation</span>
            <span className="text-sm font-bold font-quicksand text-gray-800">
              {Math.round(((currentStep + 1) / treatmentSteps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#000435] to-[#CF9FFF] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / treatmentSteps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Navigation Controls - CV Design */}
        <div className="px-2 md:px-4 py-3 bg-gradient-to-r from-blue-50 to-violet-50 border-b border-gray-100">
          {/* Top Row - Navigation Buttons */}
          <div className="flex justify-center items-center mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="outline"
                size="default"
                className="px-3 py-2 sm:px-4 sm:py-3 bg-[#000435] bg-gradient-to-r from-[#000435] to-[#CF9FFF] text-white border-none hover:from-[#000435]/90 hover:to-[#CF9FFF]/90 disabled:opacity-50 disabled:cursor-not-allowed font-quicksand text-sm sm:text-base shadow-lg disabled:opacity-30"
              >
                <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
              </Button>

              <span className="text-sm font-semibold font-saeada text-gray-700 px-2 hidden sm:block">
                Étape {currentStep + 1} sur {treatmentSteps.length}
              </span>

              <Button
                onClick={handleNext}
                disabled={currentStep === treatmentSteps.length - 1}
                variant="outline"
                size="default"
                className="px-3 py-2 sm:px-4 sm:py-3 bg-[#000435] bg-gradient-to-r from-[#000435] to-[#CF9FFF] text-white border-none hover:from-[#000435]/90 hover:to-[#CF9FFF]/90 disabled:opacity-50 disabled:cursor-not-allowed font-quicksand text-sm sm:text-base shadow-lg disabled:opacity-30"
              >
                <ChevronRight size={18} className="sm:w-5 sm:h-5" />
              </Button>

              <Button
                onClick={handleReset}
                variant="outline"
                size="default"
                className="px-3 py-2 sm:px-4 sm:py-3 bg-[#000435] bg-gradient-to-r from-[#000435] to-[#CF9FFF] text-white border-none hover:from-[#000435]/90 hover:to-[#CF9FFF]/90 font-quicksand text-sm sm:text-base shadow-lg"
              >
                <RotateCcw size={18} className="sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>

          {/* Bottom Row - Step Indicators */}
          <div className="flex justify-center gap-1 sm:gap-2 flex-wrap overflow-x-auto pb-2">
            {treatmentSteps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => handleStepClick(index)}
                className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-300 flex items-center justify-center text-xs sm:text-sm font-bold font-quicksand flex-shrink-0 ${
                  index === currentStep
                    ? "bg-[#000435] bg-gradient-to-r from-[#000435] to-[#CF9FFF] text-white shadow-xl scale-110"
                    : index < currentStep || showCompletion
                      ? "bg-green-400 text-white shadow-lg"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
                whileHover={{ scale: index === currentStep ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{index + 1}</span>

                {(index < currentStep || showCompletion) && (
                  <motion.div
                    className="absolute -top-1 -right-1 bg-green-400 rounded-full p-0.5 z-20 shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <CheckCircle size={6} className="sm:w-2 sm:h-2 text-white" />
                  </motion.div>
                )}

                {index === currentStep && !showCompletion && (
                  <motion.div
                    className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 z-20 shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="w-1 h-1 bg-gradient-to-r from-[#000435] to-[#CF9FFF] rounded-full animate-pulse" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Important Notice Banner - Only show on first step */}
        {currentStep === 0 && (
          <div className="mx-2 md:mx-4 mb-4">
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-amber-600 text-lg">⚠️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-amber-800">
                    <strong>Silicone mannequin required</strong> - To be purchased separately
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    This training requires a silicone mannequin for practice before working on real clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-9 gap-4 p-2 md:p-4">
          <>
            <div className="md:col-span-4 hidden md:flex flex-col justify-center">
              <motion.div
                key={`title-${currentStep}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl p-4 md:p-6 shadow-lg mb-4 md:mb-0"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-64 h-64 rounded-xl overflow-hidden shadow-md">
                    {currentStepData.image && (
                      <Image
                        src={currentStepData.image || "/placeholder.svg"}
                        alt={`${currentStepData.title} illustration`}
                        width={256}
                        height={256}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => setShowFullScreenImage(true)}
                        priority
                        sizes="256px"
                      />
                    )}
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold font-saeada text-gray-800 mb-2 md:mb-3 text-center md:text-left">
                  {currentStepData.title}
                </h2>
                <div className="flex justify-center md:justify-start mb-3">
                  <span className="inline-block px-3 py-1 md:px-4 md:py-2 bg-brand-gradient text-white rounded-full text-sm md:text-base font-bold font-quicksand">
                    {currentStepData.duration}
                  </span>
                </div>
                <p className="text-sm md:text-base font-quicksand text-gray-600 leading-relaxed text-center md:text-left">
                  {currentStepData.description}
                </p>
              </motion.div>
            </div>

            <div className="md:col-span-5 order-first md:order-none">
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStepData.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-80 sm:h-96 md:h-[32rem] rounded-3xl overflow-hidden shadow-lg bg-gray-100"
                  >
                    {currentStepData.video ? (
                      <video
                        key={currentStepData.video}
                        className="w-full h-full object-contain"
                        autoPlay={true}
                        loop={true}
                        muted={true}
                        playsInline={true}
                        controls={false}
                        preload="auto"
                        onCanPlay={() => {
                          // Force play when video is ready
                          const video = document.querySelector(`video[src="${currentStepData.video}"]`)
                          if (video) {
                            video.play().catch(e => console.log('Autoplay prevented:', e))
                          }
                        }}
                      >
                        <source src={currentStepData.video} type="video/quicktime" />
                        <source src={currentStepData.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : currentStepData.image ? (
                      <Image
                        src={currentStepData.image || "/placeholder.svg"}
                        alt={currentStepData.title}
                        fill
                        style={{ objectFit: "cover" }}
                        className="hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => setShowFullScreenImage(true)}
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span>Video not available</span>
                      </div>
                    )}

                    {isPlaying && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none rounded-3xl"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(0, 4, 53, 0.5)",
                            "0 0 0 8px rgba(0, 4, 53, 0.2)",
                            "0 0 0 0 rgba(0, 4, 53, 0.5)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence>{showCompletion && <CompletionAnimation />}</AnimatePresence>
              </div>
            </div>
          </>
        </div>

        <div className="md:hidden bg-white mx-2 mb-2 rounded-3xl shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="text-center mb-3">
              <h2 className="text-xl font-bold font-saeada text-gray-800 mb-2">{currentStepData.title}</h2>
              <span className="inline-block px-4 py-2 bg-brand-gradient text-white rounded-full text-sm font-bold font-quicksand">
              {currentStepData.duration}
            </span>
            </div>

          </div>
        </div>

        
        {/* Full Screen Image Modal */}
        <AnimatePresence>
          {showFullScreenImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
              onClick={() => setShowFullScreenImage(false)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowFullScreenImage(false)}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
                >
                  <X size={32} />
                </button>
                <Image
                  src={currentStepData.image || "/placeholder.svg"}
                  alt={currentStepData.title}
                  width={800}
                  height={600}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-16 left-0 right-0 text-center">
                  <h3 className="text-white text-lg font-semibold">{currentStepData.title}</h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
