import React, { createContext, FC, useState, useLayoutEffect } from "react";
import { useLocalstorageState } from "rooks";
import { I18nState } from "./types/i18nState";
import { IsoCode } from "./types/isoCode";
import { languages } from "./languages";

export const I18nContext = createContext<I18nState>({
  isoCode: IsoCode.EN_US,
  changeLanguage: () => {},
  texts: languages[IsoCode.EN_US],
});

export const I18nProvider: FC = ({ children }) => {
  const [currentIsoCode, setCurrentIsoCode] = useLocalstorageState<IsoCode>(
    "messagewith_language",
    IsoCode.EN_US
  );

  const [currentTexts, setCurrentTexts] = useState<
    typeof languages[IsoCode.EN_US]
  >(languages[IsoCode.EN_US]);

  const changeLanguage = (isoCode: IsoCode) => {
    setCurrentIsoCode(isoCode);
    setCurrentTexts(languages[isoCode]);
  };

  useLayoutEffect(() => {
    setCurrentTexts(languages[currentIsoCode]);
  }, [currentIsoCode]);

  return (
    <I18nContext.Provider
      value={{ isoCode: currentIsoCode, changeLanguage, texts: currentTexts }}
    >
      {children}
    </I18nContext.Provider>
  );
};
