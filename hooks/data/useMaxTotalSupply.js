import useSWR from 'swr';
import useEthenticContract from 'hooks/contracts/useEthenticContract';

const getMaxTotalSupply = ethentic => async () => {
	const maxTotalSupply = await ethentic.maxTotalSupply();
	return maxTotalSupply.toNumber();
};

export default function useMaxTotalSupply() {
	const ethentic = useEthenticContract();
	const shouldFetch = !!ethentic;

	return useSWR(
		shouldFetch ? [ 'maxTotalSupply' ] : null,
		getMaxTotalSupply(ethentic)
	);
}