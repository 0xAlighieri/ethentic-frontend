import useSWR from "swr";
import useTotalSupply from "hooks/data/useTotalSupply";

const getAllTokenIds = () => async (_, totalSupply) => {
  const tokenIds = Array(totalSupply)
    .fill()
    .map((_, i) => i);
  return tokenIds;
};

// get all token IDs for the collection in the Ethentic contract passed
// NB: assumes token uses indices incrementally from 0 to totalSupply
// NB: also assumes there is only the one collection for now
export default function useAllTokensForCollection() {
  const { data: totalSupply } = useTotalSupply();
  const shouldFetch = totalSupply > 0;

  return useSWR(shouldFetch ? ["tokensForCollection", totalSupply] : null, getAllTokenIds());
}
