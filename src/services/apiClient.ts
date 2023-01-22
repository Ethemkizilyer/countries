import { create } from "apisauce";

// Burada env değişkenlerini veya secrets manager kullanabiliriz
const COUNTRIES_API_BASE_URL = "https://restcountries.com";
const COUNTRIES_API_VERSION = "2";

// Getirme oynamak yerine apı sosu kullanıyoruz çünkü hata için güzel yardımcı programları var
// ve zaman aşımı işleme.
export const api = create({
  baseURL: `${COUNTRIES_API_BASE_URL}/v${COUNTRIES_API_VERSION}`,
  timeout: 10000,
});
