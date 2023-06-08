import type { PageServerLoad } from './$types';
import { states } from '$lib/helpers/states';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const stateCode = params.slug;
    const state = states.find((s) => s.code === stateCode);

    if (state) {
      const stateStreams = await getNowStreamData(stateCode);
      return {
        stateCode: state.code,
        stateTitle: state.name,
        stateStreams: stateStreams
      };
    } else {
      return {
        stateTitle: 'State Not Found'
      };
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return {
      stateTitle: 'Error Occurred'
    };
  }
};

async function getNowStreamData(stateCode: string | undefined) {
  const url =
    'http://waterservices.usgs.gov/nwis/iv/?stateCd=' +
    stateCode +
    '&siteType=ST&siteStatus=active&parameterCd=00060&format=json';

  const res = await fetch(url);
  const data = await res.json();
  return data.value;
}
