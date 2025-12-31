import { expect } from "chai";
import hre from "hardhat";

describe("KoiCert", function () {

  async function deployFixture() {
    const [issuer, other] = await hre.ethers.getSigners();

    const KoiCert = await hre.ethers.getContractFactory("KoiCert");
    const koiCert = await KoiCert.deploy();
    await koiCert.waitForDeployment();

    return { koiCert, issuer, other };
  }

  it("Should mint koi certificate", async function () {
    const { koiCert, issuer } = await deployFixture();

    await koiCert.mintCertificate(
      "KOI-001",
      "Kohaku",
      "Dainichi",
      "Female",
      "Nisai",
      55,
      "Healthy",
      "https://photo.url",
      "https://cert.url",
      "https://contest.url"
    );

    const koi = await koiCert.getKoi("KOI-001");

    expect(koi.id).to.equal("KOI-001");
    expect(koi.variety).to.equal("Kohaku");
    expect(koi.breeder).to.equal("Dainichi");
    expect(koi.issuer).to.equal(issuer.address);
  });

  it("Should not allow duplicate koi ID", async function () {
    const { koiCert } = await deployFixture();

    await koiCert.mintCertificate(
      "KOI-002",
      "Showa",
      "Local",
      "Male",
      "Tosai",
      40,
      "Healthy",
      "url1",
      "",
      ""
    );

    await expect(
      koiCert.mintCertificate(
        "KOI-002",
        "Showa",
        "Local",
        "Male",
        "Tosai",
        40,
        "Healthy",
        "url1",
        "",
        ""
      )
    ).to.be.revertedWith("ID Koi sudah terdaftar!");
  });

  it("Should return empty data for unknown ID", async function () {
    const { koiCert } = await deployFixture();

    const koi = await koiCert.getKoi("UNKNOWN");
    expect(koi.id).to.equal("");
  });

});
