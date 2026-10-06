create policy "anon full access" on public.messages
  for all to anon using (true) with check (true);
