type About = {
  title: string;
  text: string;
  align: 'right' | 'left' | 'center';
};

export const aboutData: About[][] = [
  [
    {
      title: 'World of Cinema',
      text: "We created this site for everyone who loves movies. Here, you'll find previews of the most exciting films—from timeless classics to the latest releases. No matter your genre or mood, there's something for everyone.",
      align: 'right',
    },
    {
      title: 'Easy Search',
      text: "Not sure what to watch? We've got you covered! Browse short descriptions, get a feel for the movie's atmosphere, and pick the perfect film. We've gathered the best selections to make your choice easy.",
      align: 'left',
    },
  ],
  [
    {
      title: 'For Every Mood',
      text: 'Love action-packed blockbusters, touching dramas, or spine-chilling horror? We have films for every mood and occasion. Just choose a category and start watching!',
      align: 'right',
    },
    {
      title: 'Simplicity',
      text: 'We value your time, so we made the site as user-friendly as possible. No unnecessary details—just clear and concise previews to help you decide quickly.',
      align: 'left',
    },
  ],
  [
    {
      title: 'Your Personal Movie Navigator',
      text: 'Discover new worlds, explore different genres, and find films that leave a lasting impression. Our site is your guide to the endless universe of cinema.',
      align: 'center',
    },
  ],
];
