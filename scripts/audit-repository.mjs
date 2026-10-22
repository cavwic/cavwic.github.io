import {createRepositoryTestServer} from './repository-test-server.mjs';

const server=await createRepositoryTestServer();

try {
  const repository = await server.ssrLoadModule("/src/data/repository/index.ts");
  const locales = ["zh", "en"];
  const recordsByLocale = new Map();
  const companiesByLocale = new Map();
  const errors = [];
  const waveFourteenCompanySlugs = new Set([
    "ubtech", "agibot", "zsibot", "engineai", "kepler", "aheadform", "hexagon-robotics",
    "wandercraft", "tesla-optimus", "xpeng-robotics", "mentee-robotics", "engineered-arts",
    "clone-robotics", "anybotics", "rainbow-robotics", "diligent-robotics",
    "collaborative-robotics", "kawada-robotics", "inspire-robots", "dh-robotics",
  ]);
  const minimumKnownParametersById = new Map([
    ["deep-unitree-quadruped-1", 47],
    ["verified-ouster-osdome-rev8", 81],
    ["verified-ouster-os0-rev8", 81],
    ["verified-ouster-os1-rev8", 81],
    ["verified-ouster-os1-max-rev8", 81],
    ["livox-mid-360", 25],
    ["livox-mid-360s", 25],
    ["livox-mid-70", 23],
    ["livox-avia", 26],
    ["livox-avia-2", 26],
    ["livox-tele-15", 22],
    ["orbbec-gemini-335", 32],
    ["orbbec-gemini-336", 32],
    ["orbbec-gemini-335l", 32],
    ["orbbec-gemini-336l", 32],
    ["orbbec-gemini-335le", 32],
    ["orbbec-gemini-338le", 32],
    ["orbbec-gemini-335lg", 32],
    ["orbbec-gemini-338lg", 32],
    ["pal-robotics-talos", 36],
    ["tesollo-dg-5f-m", 10],
    ["tesollo-dg-5f-s", 10],
    ["tesollo-dg-4f", 10],
    ["tesollo-dg-3f-m", 12],
    ["tesollo-dg-3f-b", 11],
    ["tesollo-dg-2f", 10],
    ["tesollo-dg-1f", 8],
    ...[
      "bota-minione-gen-a",
      "bota-minione-pro-gen-a",
      "bota-mimx-gen-a",
      "bota-rokubi-t5-gen-a",
      "bota-rokubi-t15-gen-a",
      "bota-sensone-t5-gen-a",
      "bota-sensone-t15-gen-a",
      "bota-pixone-t25-gen-a",
      "bota-pixone-t60-gen-a",
      "bota-laxone-gen-a",
      "bota-sensone-t80-gen-a",
      "bota-megaone-t180-gen-a",
      "bota-megaone-t540-gen-a",
      "bota-kinova-gen3-ft-v2",
    ].map((id) => [id, 20]),
    ...[
      "universal-robots-ur3e",
      "universal-robots-ur7e",
      "universal-robots-ur12e",
      "universal-robots-ur16e",
    ].map((id) => [id, 44]),
    ...[
      "universal-robots-ur8-long",
      "universal-robots-ur15",
      "universal-robots-ur18",
      "universal-robots-ur20",
      "universal-robots-ur30",
    ].map((id) => [id, 36]),
    ...[
      "realsense-d457",
      "realsense-d456",
      "realsense-d455",
      "realsense-d455f",
      "realsense-d435",
      "realsense-d435i",
      "realsense-d435f",
      "realsense-d435if",
      "realsense-d415",
      "realsense-d405",
    ].map((id) => [id, 18]),
    ...[
      "zivid-2-plus-mr60",
      "zivid-2-plus-mr130",
      "zivid-2-plus-lr110",
      "zivid-3-xl250",
    ].map((id) => [id, 19]),
    ...[
      "jaka-zu3",
      "jaka-zu5",
      "jaka-zu7",
      "jaka-zu12",
      "jaka-zu18",
      "jaka-zu20",
      "jaka-zu30",
    ].map((id) => [id, 18]),
    ...[
      "ufactory-xarm-5",
      "ufactory-xarm-6",
      "ufactory-xarm-7",
    ].map((id) => [id, 29]),
    ["ufactory-850", 28],
    ["ufactory-lite6", 19],
    ["ufactory-xarm-gripper", 11],
    ["ufactory-as1200", 13],
    ["ufactory-g2-ag1200", 16],
    ["ufactory-lite6-gripper-lg1000", 6],
    ["ufactory-lite6-vacuum-ls1001", 6],
    ...[
      "elite-cs63",
      "elite-cs66",
      "elite-cs68",
      "elite-cs612",
      "elite-cs616",
      "elite-cs618",
      "elite-cs620",
      "elite-cs625",
    ].map((id) => [id, 28]),
    ["elite-cs630", 27],
    ["kinova-gen3-6dof", 26],
    ["kinova-gen3-7dof", 26],
    ["kinova-gen3-lite", 19],
    ["kinova-link-6", 29],
    ["kinova-jaco-assistive-arm", 9],
    ...[
      "aubo-i3",
      "aubo-i5",
      "aubo-i7",
      "aubo-i10",
      "aubo-i12",
      "aubo-i16",
      "aubo-i20",
    ].map((id) => [id, 20]),
    ...[
      "dobot-cr3a",
      "dobot-cr5a",
      "dobot-cr7a",
      "dobot-cr6al",
      "dobot-cr10a",
      "dobot-cr12a",
      "dobot-cr16a",
      "dobot-cr16al",
    ].map((id) => [id, 19]),
    ["dobot-cr20a", 18],
    ["dobot-cr30a", 18],
    ...[
      "kassow-kr810",
      "kassow-kr1018",
      "kassow-kr1205",
      "kassow-kr1410",
      "kassow-kr1805",
    ].map((id) => [id, 27]),
    ["kassow-kr1240", 6],
    ["kassow-kr1824", 6],
    ["techman-tm3s", 6],
    ...[
      "techman-tm5s",
      "techman-tm6s",
      "techman-tm7s",
      "techman-tm12s",
      "techman-tm14s",
      "techman-tm20s",
      "techman-tm25s",
      "techman-tm30s",
      "techman-tm30sc",
    ].map((id) => [id, 26]),
    ...[
      "techman-tm5-700",
      "techman-tm5-900",
      "techman-tm12",
      "techman-tm14",
      "techman-tm16",
      "techman-tm20",
    ].map((id) => [id, 25]),
    ["franka-research-3", 21],
    ["franka-production-3", 21],
    ["franka-hand", 8],
    ["franka-diana-7", 25],
    ["franka-fr3-duo", 6],
    ["franka-mobile-fr3-duo", 11],
    ["franka-tactile-mobile-robot", 8],
    ["franka-gello", 4],
    ["franka-gello-duo", 4],
    ["standard-bots-spark", 10],
    ["standard-bots-core", 27],
    ["standard-bots-thor", 27],
    ["standard-bots-bolt", 8],
    ["elephant-mypalletizer-260-pi", 11],
    ["elephant-mypalletizer-260-m5", 11],
    ["elephant-ultraarm-p340", 13],
    ["elephant-mecharm-270-pi", 10],
    ["elephant-mecharm-270-m5", 10],
    ["elephant-mycobot-280-pi", 40],
    ["elephant-mycobot-280-m5", 8],
    ["elephant-mycobot-280-jetson", 8],
    ["elephant-mycobot-280-arduino", 8],
    ["elephant-mycobot-320-pi", 8],
    ["elephant-mycobot-320-m5", 8],
    ["elephant-mycobot-pro600", 12],
    ["elephant-myarm-300-pi", 12],
    ["elephant-myarm-m750", 15],
    ["elephant-mybuddy-280-pi", 14],
    ["elephant-myagv-2023", 13],
    ["elephant-mercury-a1", 13],
    ["elephant-mercury-b1", 18],
    ["elephant-mercury-x1", 20],
    ["agility-digit-v5", 6],
    ["figure-03", 14],
    ["figure-helix-02", 9],
    ["1x-neo-current", 38],
    ["1x-neo-25dof-hand", 14],
    ["sanctuary-hydraulic-hand-17dof", 6],
    ["neura-4ne1", 9],
    ...[
      "neura-lara-3",
      "neura-lara-5",
      "neura-lara-8",
      "neura-lara-10",
      "neura-lara-lm-15",
      "neura-lara-lm-20",
      "neura-lara-lm-25l",
      "neura-lara-lm-30",
      "neura-lara-lm-30l",
    ].map((id) => [id, 12]),
    ...[
      "neura-maira-s",
      "neura-maira-m",
      "neura-maira-l",
    ].map((id) => [id, 11]),
    ...[
      "neura-mav-500",
      "neura-mav-1500",
      "neura-mavplus",
    ].map((id) => [id, 9]),
    ["neura-omnisensor", 5],
    ["boston-atlas-electric-2026", 23],
    ["boston-spot-current", 30],
    ["boston-stretch-2025", 18],
    ["boston-spot-arm", 9],
    ["apptronik-apollo-2", 10],
    ["apptronik-apollo-2023", 7],
    ...[
      "booster-k1-geek",
      "booster-k1-education",
      "booster-k1-professional",
    ].map((id) => [id, 54]),
    ...[
      "booster-t1-basic",
      "booster-t1-standard",
      "booster-t1-customized",
    ].map((id) => [id, 32]),
    ...[
      "booster-t2-education-e1",
      "booster-t2-education-e2",
      "booster-t2-education-e3",
      "booster-t2-professional-p1",
      "booster-t2-professional-p2",
      "booster-t2-professional-p3",
    ].map((id) => [id, 62]),
    ["noetix-bumi-standard", 46],
    ["noetix-bumi-education", 48],
    ["noetix-n2-standard", 39],
    ["noetix-n2-education", 39],
    ["noetix-e1-standard", 47],
    ["noetix-e1-education", 47],
    ["noetix-xiaonuo-3", 8],
    ["noetix-hobbs-w1", 40],
    ...[
      "fourier-gr1l",
      "fourier-gr1",
      "fourier-gr1l-pro",
      "fourier-gr1-pro",
    ].map((id) => [id, 58]),
    ["fourier-gr2", 170],
    ["fourier-gr3", 193],
    ["fourier-gr3c", 186],
    ["fourier-n1", 143],
    ["fourier-grw", 16],
    ["fourier-fdh6", 7],
    ["ubtech-walker", 18],
    ["ubtech-walker-x", 11],
    ["ubtech-ugot", 13],
    ["agibot-a3", 12],
    ...["agibot-a2-ultra", "agibot-a2-lite"].map((id) => [id, 26]),
    ...["agibot-powerflow-r86-3", "agibot-powerflow-r86-2", "agibot-powerflow-r52", "agibot-dcu"].map((id) => [id, 7]),
    ["agibot-powerflow-l28", 5],
    ["agibot-omnipicker", 6],
    ...["zsibot-l1-w", "zsibot-m1"].map((id) => [id, 17]),
    ...["engineai-pm01-business", "engineai-pm01-education"].map((id) => [id, 15]),
    ["anybotics-anymal", 24],
    ["anybotics-anymal-x", 31],
    ...["rainbow-rbm-d1000", "rainbow-rbm-s100a"].map((id) => [id, 10]),
    ["kawada-nextage-nxa", 21],
    ["kawada-nextage-nxa-open", 23],
    ["inspire-rh56bfx", 20],
    ["inspire-rh56dfx", 19],
    ["inspire-rh56e2", 21],
    ["inspire-rh56f1", 22],
    ["inspire-rh5dg2", 18],
    ["inspire-rh56h1", 22],
    ...["inspire-eg2-4b", "inspire-eg2-4c"].map((id) => [id, 15]),
    ...["inspire-la10", "inspire-la16"].map((id) => [id, 20]),
    ...["inspire-la30", "inspire-la50", "inspire-las30"].map((id) => [id, 14]),
    ...["inspire-las10", "inspire-las16"].map((id) => [id, 26]),
    ...["inspire-laf10", "inspire-laf16"].map((id) => [id, 22]),
    ...["inspire-laf30", "inspire-laf50", "inspire-lasf30"].map((id) => [id, 16]),
    ...["inspire-lasf10", "inspire-lasf16"].map((id) => [id, 28]),
    ...[
      "inspire-blac05-c162", "inspire-blac10", "inspire-blac20", "inspire-blac30",
      "inspire-blas10", "inspire-blas20", "inspire-blas30",
    ].map((id) => [id, 16]),
    ...[
      "inspire-blacf10", "inspire-blacf20", "inspire-blacf30",
      "inspire-blasf10", "inspire-blasf20", "inspire-blasf30",
    ].map((id) => [id, 18]),
    ...["dh-pge-5-26", "dh-pge-8-14"].map((id) => [id, 17]),
    ["dh-pgi-140-80", 16],
    ...[
      "dh-pgea-2-10", "dh-pgea-15-10", "dh-pgea-15-26", "dh-pgea-50-26",
      "dh-pgea-100-26", "dh-pgea-15-40", "dh-pgea-50-40", "dh-pgea-100-40", "dh-pgse-15-7",
    ].map((id) => [id, 15]),
    ...["dh-pgc-50-35", "dh-pgc-140-50", "dh-pgc-300-60"].map((id) => [id, 17]),
    ...["dh-ag-160-95", "dh-ag-105-145", "dh-dh-3"].map((id) => [id, 16]),
    ...["dh-rgic-35-12", "dh-rgi-100-14", "dh-rgi-100-22", "dh-rgi-100-30"].map((id) => [id, 20]),
    ["dh-rgic-100-35", 19],
    ["dh-dh-5-6", 22],
    ["dh-ifm-t1", 8],
    ["dh-dhex-100-50", 35],
  ]);

  for (const locale of locales) {
    const records = repository.getStandaloneRepositoryProductRecords(locale);
    const companies = repository.getStandaloneRepositoryCompanies(locale);
    recordsByLocale.set(locale, records);
    companiesByLocale.set(locale, companies);

    const recordIds = new Set();
    for (const record of records) {
      if (recordIds.has(record.id)) errors.push(`${locale}: duplicate product id ${record.id}`);
      recordIds.add(record.id);

      if (!/^https?:\/\//.test(record.officialUrl)) {
        errors.push(`${locale}: ${record.id} has no direct public URL`);
      }

      const coverage = record.evidence?.specificationCoverage;
      if (!coverage) errors.push(`${locale}: ${record.id} has no specification coverage state`);

      const known = record.parameters.filter((parameter) => parameter.status !== "unknown");
      const unknown = record.parameters.filter((parameter) => parameter.status === "unknown");
      const minimumKnownParameters = minimumKnownParametersById.get(record.id);
      if (minimumKnownParameters && known.length < minimumKnownParameters) {
        errors.push(`${locale}: ${record.id} has ${known.length} known parameters; expected at least ${minimumKnownParameters}`);
      }
      if (coverage === "official-complete" && unknown.length) {
        errors.push(`${locale}: ${record.id} is marked official-complete but has ${unknown.length} unknown fields`);
      }

      for (const parameter of known) {
        if (!parameter.sourceUrl || !/^https?:\/\//.test(parameter.sourceUrl)) {
          errors.push(`${locale}: ${record.id} / ${parameter.label} has no parameter source URL`);
        }
        for (const normalized of parameter.normalized ?? []) {
          if (!normalized.values.length || normalized.values.some((value) => !Number.isFinite(value))) {
            errors.push(`${locale}: ${record.id} / ${parameter.label} has invalid normalized values`);
          }
          if (!Number.isFinite(normalized.min) || !Number.isFinite(normalized.max) || normalized.min > normalized.max) {
            errors.push(`${locale}: ${record.id} / ${parameter.label} has an invalid normalized range`);
          }
        }
      }
    }

    const companySlugs = new Set();
    for (const company of companies) {
      if (companySlugs.has(company.slug)) errors.push(`${locale}: duplicate company slug ${company.slug}`);
      companySlugs.add(company.slug);

      // Company overview product names summarize families. Validate the actual
      // page catalog, which must include every canonical model for this company.
      const expectedIds = new Set(records.filter(record => record.profile.slug === company.slug).map(record => record.id));
      const pageProducts = repository.getStandaloneRepositoryCompanyProductRecords(company.slug, locale);
      const pageIds = new Set(pageProducts.map(record => record.id));
      for (const id of expectedIds) if (!pageIds.has(id)) errors.push(`${locale}: ${company.slug} company page omits product ${id}`);
      for (const product of pageProducts) {
        if (!expectedIds.has(product.id)) errors.push(`${locale}: ${company.slug} company page includes unrelated product ${product.id}`);
        if (!repository.getStandaloneRepositoryProductPath(product.id, locale)) errors.push(`${locale}: ${product.id} company-page link has no repository route`);
      }

      if (waveFourteenCompanySlugs.has(company.slug)) {
        const recordProductNames = new Set(records
          .filter((record) => record.profile.slug === company.slug)
          .map((record) => record.product));
        for (const productName of company.products) {
          if (!recordProductNames.has(productName)) {
            errors.push(`${locale}: ${company.slug} company profile references missing product ${productName}`);
          }
        }
      }
    }
  }

  const zhIds = new Set(recordsByLocale.get("zh").map((record) => record.id));
  const enIds = new Set(recordsByLocale.get("en").map((record) => record.id));
  for (const id of zhIds) if (!enIds.has(id)) errors.push(`English catalog is missing product ${id}`);
  for (const id of enIds) if (!zhIds.has(id)) errors.push(`Chinese catalog is missing product ${id}`);
  const enRecordById = new Map(recordsByLocale.get("en").map((record) => [record.id, record]));
  for (const record of recordsByLocale.get("zh")) {
    const englishRecord = enRecordById.get(record.id);
    if (englishRecord && record.parameters.length !== englishRecord.parameters.length) {
      errors.push(`Bilingual parameter-count mismatch for ${record.id}: zh ${record.parameters.length}, en ${englishRecord.parameters.length}`);
    }
  }

  const zhCompanySlugs = new Set(companiesByLocale.get("zh").map((company) => company.slug));
  const enCompanySlugs = new Set(companiesByLocale.get("en").map((company) => company.slug));
  for (const slug of zhCompanySlugs) if (!enCompanySlugs.has(slug)) errors.push(`English catalog is missing company ${slug}`);
  for (const slug of enCompanySlugs) if (!zhCompanySlugs.has(slug)) errors.push(`Chinese catalog is missing company ${slug}`);

  const zhRecords = recordsByLocale.get("zh");
  const zhCompanies = companiesByLocale.get("zh");
  const coverageCounts = Object.fromEntries(
    [...new Set(zhRecords.map((record) => record.evidence?.specificationCoverage ?? "missing"))]
      .map((coverage) => [coverage, zhRecords.filter((record) => (record.evidence?.specificationCoverage ?? "missing") === coverage).length]),
  );
  const indexedProducts = zhRecords.filter((record) => record.parameters.some((parameter) => parameter.normalized?.length)).length;
  const indexedParameters = zhRecords.flatMap((record) => record.parameters).filter((parameter) => parameter.normalized?.length).length;
  const knownParameters = zhRecords.flatMap((record) => record.parameters).filter((parameter) => parameter.status !== "unknown");
  const sourceBackedParameters = knownParameters.filter((parameter) => parameter.sourceUrl && /^https?:\/\//.test(parameter.sourceUrl));
  const modelLevelProducts = zhRecords.filter((record) => record.evidence?.level === "model");
  const recordsByCompanySlug = new Map();
  for (const record of zhRecords) {
    const slug = record.profile.slug;
    const companyRecords = recordsByCompanySlug.get(slug) ?? [];
    companyRecords.push(record);
    recordsByCompanySlug.set(slug, companyRecords);
  }
  const noModelLevelCompanies = zhCompanies.filter((company) => (
    !(recordsByCompanySlug.get(company.slug) ?? []).some((record) => record.evidence?.level === "model")
  ));
  const noIndexedProductCompanies = zhCompanies.filter((company) => (
    !(recordsByCompanySlug.get(company.slug) ?? []).some((record) => record.parameters.some((parameter) => parameter.normalized?.length))
  ));
  const trackedCompanyCoverage = Object.fromEntries(
    [
      "paxini", "limx-dynamics", "robotera", "onrobot", "robotiq", "unitree", "ouster", "livox", "orbbec",
      "pal-robotics", "tesollo", "bota-systems", "universal-robots", "realsense", "zivid", "jaka-robotics",
      "ufactory", "elite-robots", "kinova", "aubo-robotics", "dobot", "kassow-robots", "techman-robot",
      "franka-robotics", "standard-bots", "elephant-robotics", "agility-robotics", "figure-ai",
      "1x-technologies", "sanctuary-ai", "neura-robotics", "boston-dynamics", "apptronik",
      "booster-robotics", "noetix-robotics", "fourier-intelligence",
      "ubtech", "agibot", "zsibot", "engineai", "kepler", "aheadform", "hexagon-robotics",
      "wandercraft", "tesla-optimus", "xpeng-robotics", "mentee-robotics", "engineered-arts",
      "clone-robotics", "anybotics", "rainbow-robotics", "diligent-robotics",
      "collaborative-robotics", "kawada-robotics", "inspire-robots", "dh-robotics",
    ].map((slug) => {
      const companyRecords = recordsByCompanySlug.get(slug) ?? [];
      return [slug, {
        products: companyRecords.length,
        modelLevel: companyRecords.filter((record) => record.evidence?.level === "model").length,
        officialComplete: companyRecords.filter((record) => record.evidence?.specificationCoverage === "official-complete").length,
        indexedProducts: companyRecords.filter((record) => record.parameters.some((parameter) => parameter.normalized?.length)).length,
        knownParameters: companyRecords.flatMap((record) => record.parameters).filter((parameter) => parameter.status !== "unknown").length,
      }];
    }),
  );
  const thinCompanyProfiles = companiesByLocale.get("zh").filter((company) => (
    (company.overview?.length ?? 0) < 2
    || (company.businessAreas?.length ?? 0) < 2
    || (company.customerGroups?.length ?? 0) < 1
    || (company.milestones?.length ?? 0) < 2
  ));
  const companyProfilesWithoutEmbeddedOfficialUrl = companiesByLocale.get("zh")
    .filter((company) => !company.officialUrl || !/^https?:\/\//.test(company.officialUrl)).length;

  console.log(JSON.stringify({
    companies: companiesByLocale.get("zh").length,
    products: zhRecords.length,
    coverage: coverageCounts,
    modelLevelProducts: modelLevelProducts.length,
    indexedProducts,
    indexedParameters,
    knownParameters: knownParameters.length,
    sourceBackedParameters: sourceBackedParameters.length,
    companiesWithNoModelLevelProducts: noModelLevelCompanies.length,
    companiesWithNoIndexedProducts: noIndexedProductCompanies.length,
    trackedCompanyCoverage,
    companyProfilesPendingDeepReview: thinCompanyProfiles.length,
    companyProfilesUsingExternalSourceResolution: companyProfilesWithoutEmbeddedOfficialUrl,
    integrityErrors: errors.length,
  }, null, 2));

  if (process.argv.includes("--details")) {
    console.log("\nCompanies without model-level products:");
    console.log(noModelLevelCompanies.map((company) => `${company.slug}\t${company.name}`).join("\n"));
    console.log("\nCompanies without indexed products:");
    console.log(noIndexedProductCompanies.map((company) => `${company.slug}\t${company.name}`).join("\n"));
    console.log("\nCompany profiles pending deep review:");
    console.log(thinCompanyProfiles.map((company) => `${company.slug}\t${company.name}`).join("\n"));
  }

  if (errors.length) {
    console.error("\nRepository integrity errors:");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
  }
} finally {
  await server.close();
}
