export default async function Page({ params }: { params: { slug: string } }) {
  // media
  //  all torrent
  if (params.slug == "media") {
  } else if (params.slug == "media") {
  } else {
    // 404
    return <div>404</div>;
  }

  // data access points
  const data = [1, 3, 4];

  // limit the flow with currernt slug

  // 1. get the slug
  // 2. get the data
  // 3. render the data

  return <div>{params.slug}</div>;
}
