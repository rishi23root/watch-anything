export default async function Expore() {
  const pageData = {};
  const data = [1, 3, 4];

  // limit the flow with currernt slug

  // 1. get the slug
  // 2. get the data
  // 3. render the data

  return (
    <div>
      Expore
      {data.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}
