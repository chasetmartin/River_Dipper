import type { PageServerLoad } from '../$types';

export const load = (({ params }) => {
    async function getIndStreamData(siteCode: string | undefined) {
            const res = await fetch("http://waterservices.usgs.gov/nwis/iv/?sites=" + siteCode + "&parameterCd=00060&period=P30D&format=json")
            const data = await res.json()
            return data.value
        }
        return {
            indStream: getIndStreamData(params.slug)
        };

}) satisfies PageServerLoad;