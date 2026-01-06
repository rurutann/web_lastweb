// Imageコンポーネントを外部ファイルからインポートする代わりに、
// このファイル内に直接定義します（エラー回避のため）

function Image() {
  // チュートリアルで使われている可能性のある犬の画像URLのプレースホルダー
  const imageUrl = "https://placehold.co/400x250/333/ffffff?text=Dog+Image";
  
  return (
    <div className="card shadow-md">
      <div className="card-image">
        <figure className="image is-4by3">
          {/* 画像が表示されない場合を想定したプレースホルダーを使用 */}
          <img src={imageUrl} alt="犬の画像" className="w-full h-full object-cover rounded-lg" />
        </figure>
      </div>
      <div className="card-content p-3">
        <p className="text-sm text-center text-gray-500">
          画像コンポーネント
        </p>
      </div>
    </div>
  );
}

export default function Main() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 border-b pb-2">
        メインコンテンツエリア
      </h2>
      
      {/* -------------------- 画像部分 -------------------- */}
      <div className="flex justify-center mb-10">
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <Image /> {/* ★これでImageコンポーネントが動的に表示される */}
        </div>
      </div>
      
      {/* -------------------- 画像以外のコンテンツの追加 -------------------- */}
      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold mb-4 text-blue-600">
          演習の次のステップ
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          画像コンポーネントの下に、演習で要求されている**犬種リストやボタンなど**のコンテンツを追加しました。画像だけでなく、この下の要素が表示されているかご確認ください。
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
          <li className="flex items-center">
            <span className="inline-block w-2 h-2 mr-2 bg-blue-500 rounded-full"></span>
            アイテム 1: ここに犬種名などをリストアップ
          </li>
          <li className="flex items-center">
            <span className="inline-block w-2 h-2 mr-2 bg-blue-500 rounded-full"></span>
            アイテム 2: 情報を追加
          </li>
          <li className="flex items-center">
            <span className="inline-block w-2 h-2 mr-2 bg-blue-500 rounded-full"></span>
            アイテム 3: 更なる要素
          </li>
        </ul>
        <button className="mt-6 px-6 py-2 bg-green-500 text-white font-bold rounded-full shadow-md hover:bg-green-600 transition duration-300">
          新しい要素を追加するボタン
        </button>
      </section>
      
    </main>
  );
}