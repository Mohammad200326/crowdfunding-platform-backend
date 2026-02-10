"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideEffectQueue = void 0;
class SideEffectQueue {
    effects = [];
    add(label, fn) {
        this.effects.push({ label, fn });
    }
    async runAll() {
        if (!this.effects.length)
            return;
        const results = await Promise.allSettled(this.effects.map((e) => e.fn()));
        results.forEach((r, i) => {
            const { label } = this.effects[i];
            if (r.status === 'rejected') {
                console.error(`[SideEffect FAIL] ${label}:`, r.reason);
            }
            else {
                console.log(`[SideEffect OK] ${label}`);
            }
        });
        this.effects = [];
    }
}
exports.SideEffectQueue = SideEffectQueue;
//# sourceMappingURL=side-effects.js.map