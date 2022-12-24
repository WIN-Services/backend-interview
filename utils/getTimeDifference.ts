export const getTimeDiff = (oDatePublished: any) => {
  if (oDatePublished) {
    var oResult: {
      hours: number;
    } = { hours: 0 };
    var oToday = new Date();
    var nDiff: any = oToday.getTime() - oDatePublished.getTime();
    oResult.hours = Math.floor(nDiff / 1000 / 60 / 60);
    nDiff -= oResult.hours * 1000 * 60 * 60;
    return oResult;
  } else {
    return {
      hours: 0,
    };
  }
};
