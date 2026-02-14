import { Shield, Landmark, IndianRupee, Globe, Users, Gavel, ArrowRight } from "lucide-react";

const departments = [
  { icon: Shield, name: "Home Affairs", desc: "Internal security & law enforcement" },
  { icon: Landmark, name: "Defence", desc: "National security & armed forces" },
  { icon: IndianRupee, name: "Finance", desc: "Treasury, taxation & economic policy" },
  { icon: Globe, name: "External Affairs", desc: "Diplomacy & international relations" },
  { icon: Users, name: "Human Resources", desc: "Education & workforce development" },
  { icon: Gavel, name: "Law & Justice", desc: "Judiciary & constitutional matters" },
];

const MinistriesSection = () => {
  return (
    <section id="ministries" className="py-12 md:py-16 bg-background">
      <div className="gov-section">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-primary rounded-full" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">Ministries & Departments</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((d) => (
            <a
              key={d.name}
              href="#"
              className="gov-card p-5 flex items-center gap-4 group"
            >
              <div className="p-3 rounded-md bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <d.icon size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{d.name}</h4>
                <p className="text-sm text-muted-foreground">{d.desc}</p>
              </div>
              <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MinistriesSection;
