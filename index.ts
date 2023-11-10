import PQueue from "p-queue";

async function main() {
  const queue = new PQueue({ concurrency: 500 });
}

main()
  .then(() => console.log("done"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
