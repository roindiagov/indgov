CREATE POLICY "Admins can update roles" 
  ON public.user_roles 
  FOR UPDATE 
  TO authenticated 
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));