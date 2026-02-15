import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const quotes = [
  { text: "The best way to find yourself is to lose yourself in the service of others.", author: "Mahatma Gandhi" },
  { text: "Democracy is not merely a form of government. It is primarily a mode of associated living.", author: "Dr. B.R. Ambedkar" },
  { text: "A nation's culture resides in the hearts and in the soul of its people.", author: "Mahatma Gandhi" },
  { text: "Unity in diversity is India's strength.", author: "Jawaharlal Nehru" },
];

const AnnouncementBanner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = quotes[index];

  return (
    <section className="bg-primary/5 border-y border-border">
      <div className="gov-section py-6">
        <div className="flex items-center gap-4 justify-center text-center">
          <Quote size={24} className="text-primary/40 flex-shrink-0 hidden sm:block" />
          <div className="animate-fade-in" key={index}>
            <p className="text-foreground italic text-sm md:text-base leading-relaxed">
              "{current.text}"
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-semibold">— {current.author}</p>
          </div>
          <Quote size={24} className="text-primary/40 flex-shrink-0 rotate-180 hidden sm:block" />
        </div>
      </div>
    </section>
  );
};

export default AnnouncementBanner;
