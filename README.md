```typescript
import { animList } from 'miragerp-gta-v-animation-list/anim-list';
import { animMap } from 'miragerp-gta-v-animation-list/anim-map';


const dictIndex = animMap['abigail_mcs_1_concat-0'][0];
const animIndex = animMap['abigail_mcs_1_concat-0'][1]['csb_abigail_dual-0'];

console.log(animMap[dictIndex][0], animMap[dictIndex][1][animIndex]); // abigail_mcs_1_concat-0, csb_abigail_dual-0
```
