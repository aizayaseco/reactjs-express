/**
 *
 * Asynchronously loads the component for Pexel
 *
 */

import loadable from '../../utils/loadable';

export default loadable(() => import('./index'));
