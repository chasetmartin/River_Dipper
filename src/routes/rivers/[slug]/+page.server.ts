import type { PageServerLoad } from './$types';
import { states } from '$lib/helpers/states';

export const load = (({ params }) => {
    async function getNowStreamData(stateCode: string | undefined) {
            const res = await fetch("http://waterservices.usgs.gov/nwis/iv/?stateCd=" + stateCode + "&siteType=ST&siteStatus=active&parameterCd=00060&format=json")
            const data = await res.json()
            return data.value
        }

        const state = states.find((s) => s.code === params.slug);

        if (state) {
            return {
                stateCode: state.code,
                stateTitle: state.name,
                stateStreams: getNowStreamData(params.slug)
            };
        }
        return {
            stateTitle: "State Not Found"
        };

}) satisfies PageServerLoad;