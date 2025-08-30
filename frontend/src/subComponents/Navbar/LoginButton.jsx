
export default function LoginButton({ userInfo }) {
  if (userInfo) return null;

  return (
    <div className="flex items-center space-x-3">
      <a href="/login" className="px-6 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-xl hover:text-green-600 hover:border-green-400">
        Login
      </a>
      <a href="/signup" className="px-6 py-2 text-sm font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700">
        Sign Up
      </a>
    </div>
  );
}