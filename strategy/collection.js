module.exports = {
    cci: (price, sma200, ema200, cci) => {
        return new Promise((resolve) => {
            (async () => {
                // sma long

                let long = price >= sma200.slice(-1)[0]

                // ema long
                if (!long) {
                    long = price >= ema200.slice(-1)[0]
                }

                let before = cci.slice(-2)[0]
                let last = cci.slice(-1)[0]
                let count = cci.length - 1

                if (long) {
                    // long

                    if(before <= -100 && last >= -100) {
                        let rangeValues = []

                        for (let i = count - 1; i >= 0; i--) {
                            if (cci[i] >= -100){
                                rangeValues = cci.slice(i, count)
                                break;
                            }
                        }

                        let min = Math.min(...rangeValues);
                        if(min <= -200) {
                            resolve({
                                'signal': 'long',
                                '_trigger': min,
                            })
                        }
                    }

                } else {
                    if(before >= 100 && last <= 100) {
                        let count = cci.length - 1
                        let rangeValues = []

                        for (let i = count - 1; i >= 0; i--) {
                            if (cci[i] <= 100){
                                rangeValues = cci.slice(i, count)
                                break;
                            }
                        }

                        let max = Math.max(...rangeValues);
                        if(max >= 200) {
                            resolve({
                                'signal': 'short',
                                '_trigger': max,
                            })
                        }
                    }
                }

                resolve()
            })()
        })
    },

    macd: (price, sma200, ema200, macd) => {
        return new Promise(async (resolve) => {
            let before = macd.slice(-2)[0].histogram
            let last = macd.slice(-1)[0].histogram

            // sma long

            let long = price >= sma200.slice(-1)[0]

            // ema long
            if (!long) {
                long = price >= ema200.slice(-1)[0]
            }

            if (long) {
                // long
                if(before < 0 && last > 0) {
                    resolve({
                        'signal': 'long',
                    })
                }
            } else {
                // short

                if(before > 0 && last < 0) {
                    resolve({
                        'signal': 'short',
                    })
                }
            }

            resolve()
        })
    },
}


