
-- News table
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  tag TEXT NOT NULL DEFAULT 'General',
  status TEXT NOT NULL DEFAULT 'Published',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published news" ON public.news FOR SELECT USING (status = 'Published');
CREATE POLICY "Admins can insert news" ON public.news FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can update news" ON public.news FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete news" ON public.news FOR DELETE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can view all news" ON public.news FOR SELECT USING (is_admin(auth.uid()));

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Public Services table
CREATE TABLE public.public_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'FileText',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  featured_label TEXT,
  featured_description TEXT,
  link TEXT,
  status TEXT NOT NULL DEFAULT 'Active',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.public_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active services" ON public.public_services FOR SELECT USING (status = 'Active');
CREATE POLICY "Admins can insert services" ON public.public_services FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can update services" ON public.public_services FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete services" ON public.public_services FOR DELETE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can view all services" ON public.public_services FOR SELECT USING (is_admin(auth.uid()));

CREATE TRIGGER update_public_services_updated_at BEFORE UPDATE ON public.public_services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Ministries table with contact info
CREATE TABLE public.ministries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Building2',
  minister_name TEXT,
  roblox_username TEXT,
  discord_username TEXT,
  discord_id TEXT,
  roblox_id TEXT,
  status TEXT NOT NULL DEFAULT 'Active',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ministries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active ministries" ON public.ministries FOR SELECT USING (status = 'Active');
CREATE POLICY "Admins can insert ministries" ON public.ministries FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can update ministries" ON public.ministries FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete ministries" ON public.ministries FOR DELETE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can view all ministries" ON public.ministries FOR SELECT USING (is_admin(auth.uid()));

CREATE TRIGGER update_ministries_updated_at BEFORE UPDATE ON public.ministries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
