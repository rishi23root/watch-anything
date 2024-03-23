import { serverAPI } from "@/serverTRPC/serverAPI";
import { Suspense } from "react";

export default async function Media() {
  // var keys: keyof (typeof serverAPI.index.movie.latest)[0] ;
  var keys: string[] | undefined = undefined;

  // data access points
  const data = await serverAPI.index.movie.latest();

  if (data && data.length > 0) {
    // console.log(data[0]["title"]);
    keys = Object.keys(data[0]) as string[];
  }

  return (
    <div>
      media
      {"keys :" + keys && " yes"}
      <Suspense fallback={"loading.."}>
        <table className="md:table-fixed">
          <thead>
            {
              // create a table head with the keys data
              keys && (
                <tr>
                  {keys.map((key) => {
                    return (
                      <th key={key} className="p-4">
                        {key}
                      </th>
                    );
                  })}
                </tr>
              )
            }
          </thead>
          <tbody>
            {data &&
              data.map((item) => {
                return (
                  <tr key={item.title} className="border-b-2">
                    {keys &&
                      keys.map((key) => {
                        if (key == "torrent") {
                          return (
                            <td key={key} className="p-4 w-20">
                              {item[key]["magnet"]}
                            </td>
                          );
                        }
                        return (
                          <td key={key} className="p-4">
                            {item[key]}
                          </td>
                        );
                      })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Suspense>
    </div>
  );
}
