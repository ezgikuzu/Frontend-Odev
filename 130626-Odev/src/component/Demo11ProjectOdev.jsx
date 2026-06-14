import { useState } from "react";

const urunler = [
  {
    id: 1,
    ad: "Yedek Kablosuz Klavye",
    kategori: "Aksesuar",
    fiyat: 750,
    stok: 12,
  },
  {
    id: 2,
    ad: "Yedek Oyuncu Faresi",
    kategori: "Aksesuar",
    fiyat: 600,
    stok: 5,
  },
  {
    id: 3,
    ad: "Yedek Full HD Monitor",
    kategori: "Ekran",
    fiyat: 3200,
    stok: 8,
  },
  {
    id: 4,
    ad: "Yedek Kulaklık",
    kategori: "Ses",
    fiyat: 950,
    stok: 10,
  },
  {
    id: 5,
    ad: "Yedek SSD Disk",
    kategori: "Depolama",
    fiyat: 1500,
    stok: 6,
  },
];

const kategoriler = ["Tümü", "Aksesuar", "Ekran", "Ses", "Depolama"];

const Demo11ProjectOdev = () => {
  const [arama, setArama] = useState("");
  const [seciliKategori, setSeciliKategori] = useState("Tümü");
  const [sepet, setSepet] = useState([]);

  const filtrelenmisUrunler = urunler.filter((urun) => {
    const aramaUyuyor = urun.ad.toLowerCase().includes(arama.toLowerCase());

    const kategoriUyuyor =
      seciliKategori === "Tümü" || urun.kategori === seciliKategori;

    return aramaUyuyor && kategoriUyuyor;
  });

  const sepeteEkle = (urun) => {
    const sepetteVarMi = sepet.find((item) => item.id === urun.id);

    if (sepetteVarMi) {
      const yeniSepet = sepet.map((item) =>
        item.id === urun.id
          ? { ...item, adet: item.adet + 1 }
          : item
      );

      setSepet(yeniSepet);
    } else {
      setSepet([...sepet, { ...urun, adet: 1 }]);
    }
  };

  const adetArtir = (id) => {
    const yeniSepet = sepet.map((item) =>
      item.id === id ? { ...item, adet: item.adet + 1 } : item
    );

    setSepet(yeniSepet);
  };

  const adetAzalt = (id) => {
    const yeniSepet = sepet
      .map((item) =>
        item.id === id ? { ...item, adet: item.adet - 1 } : item
      )
      .filter((item) => item.adet > 0);

    setSepet(yeniSepet);
  };

  const sepettenSil = (id) => {
    const yeniSepet = sepet.filter((item) => item.id !== id);
    setSepet(yeniSepet);
  };

  const sepetiTemizle = () => {
    setSepet([]);
  };

  const toplamTutar = sepet.reduce((toplam, item) => {
    return toplam + item.fiyat * item.adet;
  }, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Demo 11: E-Ticaret Sepet Paneli</h2>

      <p className="mt-2 text-gray-600">
        Bu projede JSX, props, eventler, listeler ve koşullu rendering
        konularını tek bir yapıda birleştiriyoruz.
      </p>

      <div className="mt-4 border p-4 rounded">
        <h3 className="font-bold mb-3">Ürün Ara ve Filtrele</h3>

        <input
          type="text"
          placeholder="Ürün adı ara..."
          value={arama}
          onChange={(e) => setArama(e.target.value)}
          className="border p-3 w-full rounded"
        />

        <div className="mt-3 flex gap-2 flex-wrap">
          {kategoriler.map((kategori) => (
            <button
              key={kategori}
              onClick={() => setSeciliKategori(kategori)}
              className={
                seciliKategori === kategori
                  ? "bg-blue-500 text-white px-4 py-2 rounded"
                  : "bg-gray-100 px-4 py-2 rounded border"
              }
            >
              {kategori}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-4">
        <div className="col-span-2">
          <h3 className="font-bold mb-3">Ürün Listesi</h3>

          <div className="space-y-4">
            {filtrelenmisUrunler.map((urun) => (
              <div key={urun.id} className="border rounded p-4 shadow-sm">
                <h4 className="font-bold">{urun.ad}</h4>
                <p className="text-gray-500">Kategori: {urun.kategori}</p>
                <p className="text-blue-600 font-bold">
                  Fiyat: {urun.fiyat} TL
                </p>
                <p className="inline-block mt-2 bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                  Stok: {urun.stok} adet
                </p>

                <br />

                <button
                  onClick={() => sepeteEkle(urun)}
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Sepete Ekle
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="border rounded p-4 shadow-sm">
            <h3 className="font-bold text-lg mb-3">Sepetiniz</h3>

            {sepet.length === 0 ? (
              <p className="text-gray-500">Sepetiniz boş.</p>
            ) : (
              <div>
                {sepet.map((item) => (
                  <div key={item.id} className="border-b py-3">
                    <h4 className="font-bold">{item.ad}</h4>
                    <p className="text-gray-500">Fiyat: {item.fiyat} TL</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => adetAzalt(item.id)}
                        className="bg-gray-100 px-3 py-1 border rounded"
                      >
                        -
                      </button>

                      <span>{item.adet}</span>

                      <button
                        onClick={() => adetArtir(item.id)}
                        className="bg-gray-100 px-3 py-1 border rounded"
                      >
                        +
                      </button>

                      <button
                        onClick={() => sepettenSil(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                ))}

                <p className="mt-3 font-bold">
                  Toplam Tutar:{" "}
                  <span className="text-blue-600">{toplamTutar} TL</span>
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={sepetiTemizle}
                    className="bg-gray-100 px-4 py-2 rounded border"
                  >
                    Temizle
                  </button>

                  <button className="bg-green-600 text-white px-4 py-2 rounded">
                    Satın Al
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo11ProjectOdev;