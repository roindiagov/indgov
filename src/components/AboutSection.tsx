import { Shield, Target, Eye } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="gov-section">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-gov-green rounded-full" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">About INDGOV.RBLX</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <p className="text-muted-foreground leading-relaxed mb-4">
              INDGOV.RBLX is the official government portal of India on Roblox, committed to transparent governance, 
              efficient policy-making, and quality public service delivery. We bring together all government ministries, 
              departments, and services under one unified digital platform.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is to create an immersive, educational, and engaging governance experience that mirrors 
              real-world democratic institutions while fostering civic awareness among the Roblox community.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: Target, title: "Our Mission", desc: "Transparent governance and public engagement through Roblox." },
              { icon: Eye, title: "Our Vision", desc: "A model digital government fostering civic participation." },
              { icon: Shield, title: "Our Values", desc: "Integrity, accountability, inclusivity, and service." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-gov-green/10 text-gov-green">
                  <item.icon size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
