import Link from "next/link";
import { FaArrowCircleLeft, FaGithub, FaCheckCircle, FaTerminal } from "react-icons/fa";

export const metadata = {
  title: "NextCove – Get Started",
};

export default function Success() {
  return (
    <div className="py-4 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 my-4">
        <FaArrowCircleLeft />
        <Link href={"/store"}>Back to store</Link>
      </div>

      <div className="text-center my-8">
        <h1 className="text-4xl font-bold">NextCove</h1>
        <p className="text-lg text-gray-500 my-2">Get started after your purchase</p>
      </div>

      <div className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-4 my-6">
        <FaCheckCircle className="text-green-600 mt-1 shrink-0 text-xl" />
        <p className="text-green-900">
          Thank you for your purchase! To keep this simple and secure, you will be
          given access by inviting your GitHub username to the private repository.{" "}
          <Link href={"/contact"} className="underline">
            Send your GitHub username via the contact page
          </Link>
          , and once your payment is confirmed you will receive an invitation.
        </p>
      </div>

      <section className="my-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <FaTerminal /> Clone the repository
        </h2>
        <p className="my-2 text-gray-600">
          Once you have been invited to the private <code>client-sites</code>{" "}
          repository on GitHub, clone it and create your own repository.
        </p>
        <pre className="bg-gray-900 text-white rounded-xl p-4 my-3 overflow-x-auto text-sm">
          {`git clone https://github.com/tnjensen/client-sites.git
cd client-sites
# push your own copy to your own GitHub account`}
        </pre>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <FaGithub /> Set up your own deployment
        </h2>
        <ol className="list-decimal ml-5 my-3 space-y-2 text-gray-700">
          <li>
            Create a new repository on your own GitHub account and push your cloned
            copy to it.
          </li>
          <li>
            Point your own domain to your hosting / VPS. On shared hosting the
            subdomain is usually set up automatically.
          </li>
          <li>
            Add the GitHub Actions secrets for your host (
            <code>VPS_HOST</code>, <code>VPS_USER</code>, <code>VPS_SSH_KEY</code>{" "}
            or the FTP secrets) so the workflow can deploy.
          </li>
          <li>
            Push to the <code>main</code> branch and your apps deploy automatically.
          </li>
        </ol>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <FaTerminal /> Add your own Next.js app
        </h2>
        <p className="my-2 text-gray-600">
          Add an app under the <code>apps/</code> folder with a "
          <code>basePath</code>" set in its <code>next.config</code>:
        </p>
        <pre className="bg-gray-900 text-white rounded-xl p-4 my-3 overflow-x-auto text-sm">
          {`cd apps
npx create-next-app@latest my-app
cd my-app
echo 'export default { output: "export", basePath: "/my-app" };' > next.config.mjs`}
        </pre>
        <p className="my-2 text-gray-600">
          Push to <code>main</code> and your new app will be built and deployed to{" "}
          <strong>your domain</strong> under <code>/my-app</code>.
        </p>
      </section>

      <div className="text-center my-8">
        <Link href={"/contact"} className="inline-block rounded-full bg-[var(--header)] text-white px-8 py-3 font-semibold">
          Contact me for access
        </Link>
      </div>
    </div>
  );
}
