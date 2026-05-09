/**
 * Portfolio content — text copied verbatim from existing site.
 * Hero pulls from heroContent only.
 */
export const heroContent = {
  nameLines: [
    {
      parts: [
        { text: "Hi, I'm ", emphasized: false },
        { text: 'Harshit', emphasized: true },
      ],
    },
    {
      parts: [{ text: 'Kulkarni', emphasized: true }],
    },
  ] as const,
  role: 'ML Researcher | Full-Stack Developer | IEEE Published Author',
  getInTouchLabel: 'Get in Touch',
  portraitAlt:
    'Professional headshot of Harshit Kulkarni, a Computer Science student and ML researcher, wearing a white shirt and smiling confidently',
} as const;
