import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const siteCode = params.slug;
    const indStream = await getIndStreamData(siteCode);

    return {
      indStream: indStream || [] // Fallback to an empty array if indStream is null or undefined
    };
  } catch (error) {
    console.error('An error occurred:', error);
    return {
      error: {
        status: 500,
        message: 'Internal Server Error'
      }
    };
  }
};

async function getIndStreamData(siteCode: string | undefined) {
  const url = `http://waterservices.usgs.gov/nwis/iv/?sites=${siteCode}&parameterCd=00060&period=P30D&format=json`;

  const res = await fetch(url);
  const data = await res.json();

  // Check if the data structure is as expected
  if (data && data.value) {
    return data.value;
  } else {
    return null;
  }
}
