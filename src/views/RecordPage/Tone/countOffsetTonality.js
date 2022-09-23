export const countOffsetTonality = (tempo) => {

    if (tempo === 100) return 0;

    if (tempo < 100) {
        switch (tempo) {
            case 90: return tempo * 0.02;
            case 80: return tempo * 0.0475;
            case 70: return tempo * 0.0871;
            case 60: return tempo * 0.145;
            default: return tempo * 0.234;
        }
    } else {
        switch (tempo) {
            case 110: return tempo * 0.0145 * -1;
            case 120: return tempo * 0.0258 * -1;
            case 130: return tempo * 0.0346 * -1;
            case 140: return tempo * 0.0414 * -1;
            default: return tempo * 0.0466 * -1;
        }
    }
};