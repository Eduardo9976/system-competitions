import { readonly } from 'vue'

import CompetitionlModule from './competition'
import GlobalModule from './global'

// export default {
//   User: UserModule
// }
export default readonly({
  Competition: CompetitionlModule,
  Global: GlobalModule
})
