import { NextRequest, NextResponse } from 'next/server';
import passport from '../config/passport';

export async function GET(req: NextRequest) {
  return new Promise((resolve) => {
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      session: false,
    })(req, {}, (result: any) => {
      resolve(result || NextResponse.redirect('/auth/login'));
    });
  });
}