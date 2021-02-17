interface ProfileImages {
  id: number;
  img: string;
}
export const profileImages = <ProfileImages[]>[];

for (let i = 1; i < 32; i++) {
  profileImages.push({ id: i, img: `../../images/profile/profile${i}.png` });
}
