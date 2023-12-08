import useSWR from 'swr';
import useEthenticContract from 'hooks/contracts/useEthenticContract';

const getMaxTokensPerMint = ethentic => async () => {
	const maxTokensPerMint = await ethentic.maxTokensPerMint();
	return maxTokensPerMint.toNumber();
};

export default function useMaxTokens() {
	const ethentic = useEthenticContract();
	const shouldFetch = !!ethentic;

	return useSWR(
    shouldFetch ? [ 'maxTokensPerMint' ] : null,
    getMaxTokensPerMint(ethentic)
  );
}