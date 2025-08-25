"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BellRing } from "lucide-react";

const ComingSoon = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <Card className="w-full max-w-lg border-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="pt-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
          >
            <Badge variant="secondary" className="mb-4">
              Coming Soon
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-primary/50 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
          >
            Something Exciting Is Coming
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.42, 0, 0.58, 1] }}
          >
            We are crafting something amazing for you. Stay tuned for the big
            reveal!
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, ease: [0.42, 0, 0.58, 1] }}
          >
            <Button variant="outline" className="gap-2">
              <BellRing className="h-4 w-4" />
              Get Notified
            </Button>
          </motion.div>

          <motion.div
            className="mt-8 h-1 w-full bg-secondary/20 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, ease: [0.42, 0, 0.58, 1] }}
          >
            <motion.div
              className="h-full bg-primary"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "linear", // linear is valid type-safe
              }}
            />
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComingSoon;
