export const onStake = (stakingValue: string, token: 'KERES' | 'HYDRO') => {
    stakingValue
        ? alert(`Staked ${stakingValue} ${token}`)
        : alert('enter input')
}

export const onUnstake = (unstakeValue: string, token: 'KERES' | 'HYDRO') => {
    unstakeValue
        ? alert(`Unstaked ${unstakeValue} ${token}`)
        : alert('enter input')
}

export const onClaim = (token: 'KERES' | 'HYDRO') => {
    alert(`on${token}Claim`)
}