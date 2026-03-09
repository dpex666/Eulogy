import { createSupabaseServer } from './supabase';

export async function checkCanGenerate(email: string, ip: string): Promise<boolean> {
  const db = createSupabaseServer();

  // Check if this email has a paid account
  const { data: paidUser } = await db
    .from('paid_users')
    .select('id, active')
    .eq('email', email.toLowerCase())
    .eq('active', true)
    .single();

  if (paidUser) return true;

  // Check if this email has already generated a eulogy
  const { count: emailCount } = await db
    .from('generations')
    .select('id', { count: 'exact', head: true })
    .eq('email', email.toLowerCase());

  if (emailCount && emailCount >= 1) return false;

  // Check if this IP has already generated (prevents multi-email abuse on same device)
  if (ip && ip !== 'unknown') {
    const { count: ipCount } = await db
      .from('generations')
      .select('id', { count: 'exact', head: true })
      .eq('ip_address', ip);

    if (ipCount && ipCount >= 1) return false;
  }

  return true;
}

export async function isPaidUser(email: string): Promise<boolean> {
  const db = createSupabaseServer();

  const { data } = await db
    .from('paid_users')
    .select('id')
    .eq('email', email.toLowerCase())
    .eq('active', true)
    .single();

  return !!data;
}
