/** Return a user
 *
 * @returns {{getUser: (function(): {}), isSignedIn: (function(): function())}} a user
 * @constructor
 */
const UserFactory = function UF() {
  const user = {};

  const getUser = () => user;

  const isSignedIn = () => user.isSignedIn;

  return { getUser, isSignedIn };
};

export default UserFactory;
