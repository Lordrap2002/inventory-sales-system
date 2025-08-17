import api from '../api/axios';

export const getDailyReportJSON = async (date) => {
  const res = await api.get('/reports/daily-sales', {
    params: { date },
    responseType: 'blob'
  });
  return res.data;
};

export const downloadDailyReportCSV = async (date) => {
  const res = await api.get('/reports/daily-sales/csv', {
    params: { date },
    responseType: 'blob'
  });
  return res.data;
};

export const downloadDailyReportPDF = async (date) => {
  const res = await api.get('/reports/daily-sales/pdf', {
    params: { date },
    responseType: 'blob'
  });
  return res.data;
};