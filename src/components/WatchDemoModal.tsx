import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

interface WatchDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WatchDemoModal = ({ isOpen, onClose }: WatchDemoModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/90 backdrop-blur-xl"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl glass rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-card transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Video Container */}
            <div className="relative aspect-video bg-card">
              {/* Placeholder for demo video - replace with actual video */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 glow-button cursor-pointer"
                    onClick={togglePlay}
                  >
                    <Play className="w-10 h-10 text-primary-foreground ml-1" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Agency.io Demo
                  </h3>
                  <p className="text-muted-foreground">
                    See how we create stunning digital experiences
                  </p>
                </motion.div>

                {/* Animated Elements */}
                <motion.div
                  className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/20 blur-2xl"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-secondary/20 blur-2xl"
                  animate={{ scale: [1.5, 1, 1.5], opacity: [0.8, 0.5, 0.8] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
              </div>

              {/* Hidden video element for when you add a real video */}
              <video
                ref={videoRef}
                className="hidden absolute inset-0 w-full h-full object-cover"
                poster=""
                onEnded={() => setIsPlaying(false)}
              >
                {/* Add your video source here */}
                {/* <source src="/demo-video.mp4" type="video/mp4" /> */}
              </video>
            </div>

            {/* Controls */}
            <div className="p-6 flex items-center justify-between border-t border-border">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={togglePlay}
                  className="rounded-full"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleMute}
                  className="rounded-full"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFullscreen}
                  className="rounded-full"
                >
                  <Maximize className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Duration: 2:30
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WatchDemoModal;
