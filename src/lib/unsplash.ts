export async function getRandomImage() {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    console.error("Unsplash access key is not set");
    return null;
  }

  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=minimalist+blog&orientation=landscape`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  if (!response.ok) {
    console.error("Failed to fetch image from Unsplash");
    return null;
  }

  const data = await response.json();
  return data.urls.regular;
}
