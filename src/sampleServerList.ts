import type { Server } from "@/types/Server";

const sampleServerList: Server[] = [
  {
    name: 'home-red',
    address: '192.168.1.100',

    lastPing: new Date('2024-01-15T10:30:00'),
    registered: new Date('2024-01-01T09:00:00'),

    storages: [
      { id: "348d6108b327e571adf111c978288e36 ", username: 'veinedbloomers' },
      { id: "3cb0c54e47c2c4485e6ada999e6c6d6b ", username: 'granitemushroom' },
      { id: "4743cd8300c5580248f471ff247bed7a", username: 'tidingglory' },
      { id: "ce1406bfbe9d69716ee206d7bda104b1", username: 'ceaselessgainful' },
    ],
  },
  {
    name: 'alpha-web-01',
    address: '203.0.113.1',
    lastPing: new Date('2025-11-28T01:55:00.000Z'),
    registered: new Date('2025-10-01T10:00:00.000Z'),
    storages: [
      { id: 'a3f2b4c1d6e5f8a7c1b2d3e4f5a6b7c8', username: 'silentmoon' },
      { id: '9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b', username: 'riverstone' }
    ],
  },
  {
    name: 'beta-api-02',
    address: '10.0.1.2',
    lastPing: new Date('2025-11-28T01:50:00.000Z'),
    registered: new Date('2025-09-15T15:30:00.000Z'),
    storages: [
      { id: 'b1a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6', username: 'cloudwhisper' }
    ],
  },
  {
    name: 'gamma-db-03',
    address: '192.168.10.3',
    lastPing: new Date('2025-11-27T23:00:00.000Z'),
    registered: new Date('2025-08-20T08:45:00.000Z'),
    storages: [
      { id: 'c5d6e7f8a1b2c3d4e5f6a7b8c9d0e1f2', username: 'shadowfox' },
      { id: '0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d', username: 'emberglow' },
      { id: 'f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5', username: 'frostpine' }
    ],
  },
  {
    name: 'delta-cache-04',
    address: '172.16.5.4',
    lastPing: new Date('2025-11-28T01:40:00.000Z'),
    registered: new Date('2025-07-01T12:15:00.000Z'),
    storages: [
      { id: '112233445566778899aabbccddeeff00', username: 'sunbeam' },
      { id: 'aaffbbeeccdd99887766554433221100', username: 'nightowl' }
    ],
  },
  {
    name: 'epsilon-msg-05',
    address: '203.0.113.5',
    lastPing: new Date('2025-11-28T00:30:00.000Z'),
    registered: new Date('2025-06-10T11:00:00.000Z'),
    storages: [],
  },
  {
    name: 'zeta-auth-06',
    address: '10.0.1.6',
    lastPing: new Date('2025-11-26T14:20:00.000Z'),
    registered: new Date('2025-05-05T09:30:00.000Z'),
    storages: [
      { id: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', username: 'stormrider' },
      { id: '7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b', username: 'ironwood' },
      { id: '3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f', username: 'silentwave' },
      { id: '9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d', username: 'emberfall' },
      { id: '5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b', username: 'frostbloom' }
    ],
  },
  {
    name: 'eta-file-07',
    address: '192.168.10.7',
    lastPing: new Date('2025-11-28T01:00:00.000Z'),
    registered: new Date('2025-04-12T16:00:00.000Z'),
    storages: [
      { id: 'a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5', username: 'riverflow' }
    ],
  },
  {
    name: 'theta-load-08',
    address: '172.16.5.8',
    lastPing: new Date('2025-11-28T01:15:00.000Z'),
    registered: new Date('2025-03-20T14:00:00.000Z'),
    storages: [
      { id: 'b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7', username: 'cloudpeak' },
      { id: '00112233445566778899aabbccddeeff', username: 'shadowleaf' },
      { id: 'ffeeddccbbaa99887766554433221100', username: 'sunstone' }
    ],
  },
  {
    name: 'iota-monitor-09',
    address: 'monitor-uri.example.com',
    lastPing: new Date('2025-11-28T01:30:00.000Z'),
    registered: new Date('2025-02-01T10:30:00.000Z'),
    storages: [
      { id: 'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9', username: 'nightfall' }
    ],
  },
  {
    name: 'kappa-dev-10',
    address: '10.0.1.10',
    lastPing: new Date('2025-11-27T18:00:00.000Z'),
    registered: new Date('2025-01-05T09:00:00.000Z'),
    storages: [
      { id: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', username: 'stormchaser' },
      { id: '9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f', username: 'ironheart' }
    ],
  },
  {
    name: 'lambda-test-11',
    address: 'test-env.internal',
    lastPing: new Date('2025-11-28T01:59:00.000Z'),
    registered: new Date('2024-12-15T11:00:00.000Z'),
    storages: [],
  },
  {
    name: 'mu-prod-12',
    address: '192.168.10.12',
    lastPing: new Date('2025-11-28T02:00:00.000Z'),
    registered: new Date('2024-11-20T13:00:00.000Z'),
    storages: [
      { id: 'e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3', username: 'frostwind' },
      { id: '1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f', username: 'silentbrook' },
      { id: '7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d', username: 'embersky' },
      { id: '3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b', username: 'riverstone' }
    ],
  },
  {
    name: 'nu-reporting-13',
    address: '203.0.113.13',
    lastPing: new Date('2025-11-28T01:35:00.000Z'),
    registered: new Date('2024-10-01T09:00:00.000Z'),
    storages: [
      { id: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6', username: 'clouddancer' }
    ],
  },
  {
    name: 'xi-analysis-14',
    address: '10.0.1.14',
    lastPing: new Date('2025-11-27T12:00:00.000Z'),
    registered: new Date('2024-09-05T15:00:00.000Z'),
    storages: [
      { id: 'b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8', username: 'shadowglen' },
      { id: '0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d', username: 'sunflare' }
    ],
  },
  {
    name: 'omicron-tool-15',
    address: '172.16.5.15',
    lastPing: new Date('2025-11-28T01:05:00.000Z'),
    registered: new Date('2024-08-10T10:00:00.000Z'),
    storages: [
      { id: 'c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2', username: 'nightbloom' },
      { id: 'f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7', username: 'stormwatch' },
      { id: '9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d', username: 'ironwill' },
      { id: '5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b', username: 'frostpetal' },
      { id: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', username: 'silentstream' },
      { id: '7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b', username: 'emberglow' }
    ],
  },
  {
    name: 'home-red',
    address: '192.168.1.100',
    lastPing: new Date('2024-01-15T10:30:00'),
    registered: new Date('2024-01-01T09:00:00'),
    storages: [
      { id: '348d6108b327e571adf111c978288e36', username: 'veinedbloomers' },
      { id: '3cb0c54e47c2c4485e6ada999e6c6d6b', username: 'granitemushroom' },
      { id: '4743cd8300c5580248f471ff247bed7a', username: 'tidingglory' },
      { id: 'ce1406bfbe9d69716ee206d7bda104b1', username: 'ceaselessgainful' }
    ],
  },
  {
    name: 'data-center-alpha',
    address: 'tcp://10.0.1.50:8080',
    lastPing: new Date('2024-01-20T14:22:15'),
    registered: new Date('2023-12-10T08:15:00'),
    storages: [
      { id: 'a1b2c3d4e5f678901234567890123456', username: 'mountainpeak' }
    ],
  },
  {
    name: 'cloud-backup-01',
    address: 'https://storage.cloud.com/api',
    lastPing: new Date('2024-01-19T23:45:30'),
    registered: new Date('2024-01-05T11:20:00'),
    storages: [
      { id: 'fedcba9876543210fedcba9876543210', username: 'valleydeep' },
      { id: '1234567890abcdef1234567890abcdef', username: 'oceantide' }
    ],
  },
  {
    name: 'alpha-core',
    address: '10.0.0.45',
    lastPing: new Date('2024-02-20T14:22:15'),
    registered: new Date('2023-12-10T11:15:00'),
    storages: [
      { id: "a1b2c3d4e5f6789012345678901234567", username: 'silentvalley' },
      { id: "b2c3d4e5f6a7890123456789012345678", username: 'crimsonfalcon' }
    ],
  },
  {
    name: 'nebula-node',
    address: '172.16.254.3',
    lastPing: new Date('2024-02-19T23:59:01'),
    registered: new Date('2024-01-05T08:45:30'),
    storages: [
      { id: "f8e7d6c5b4a312345678901234567890", username: 'quantumleap' },
      { id: "09f8e7d6c5b432145678901234567890", username: 'solarsailor' },
      { id: "a0b1c2d3e4f5678987654321098765432", username: 'lunarshadow' }
    ],
  },
  {
    name: 'delta-storage-01',
    address: '192.168.86.201',
    lastPing: new Date('2024-02-18T09:10:05'),
    registered: new Date('2023-11-25T16:20:00'),
    storages: [
      { id: "11223344556677889900aabbccddeeff", username: 'emberglow' }
    ],
  },
  {
    name: 'echo-server',
    address: '10.1.1.100',
    lastPing: new Date('2024-02-21T01:45:50'),
    registered: new Date('2024-02-01T12:00:00'),
    storages: [
      { id: "ffeeddccbbaa00998877665544332211", username: 'oceanwhisper' },
      { id: "abcdef1234567890fedcba0987654321", username: 'mountaingaze' },
      { id: "aabbccddeeff00112233445566778899", username: 'desertwind' },
      { id: "99887766554433221100aabbccddeeff", username: 'forestecho' }
    ],
  },
  {
    name: 'omega-prime',
    address: '172.22.45.67',
    lastPing: new Date('2024-02-15T18:30:00'),
    registered: new Date('2023-10-15T14:25:10'),
    storages: [
      { id: "5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a", username: 'rustedcog' },
      { id: "a9b8c7d6e5f43a2b1c0d9e8f7a6b5c4d", username: 'violetstorm' }
    ],
  },
  {
    name: 'sigma-backup',
    address: '192.168.12.34',
    lastPing: new Date('2024-02-21T10:00:00'),
    registered: new Date('2024-01-18T17:45:00'),
    storages: [
      { id: "c0ffeec0ffeec0ffeec0ffeec0ffeec0", username: 'ancientdoor' },
      { id: "deafbeefdeafbeefdeafbeefdeafbeef", username: 'solitarypeak' },
      { id: "1234567890abcdef1234567890abcdef", username: 'wanderingriver' }
    ],
  },
  {
    name: 'tango-main',
    address: '10.50.100.150',
    lastPing: new Date('2024-02-20T16:45:22'),
    registered: new Date('2023-09-30T10:10:10'),
    storages: [
      { id: "fedcba0987654321abcdef1234567890", username: 'copperwire' },
      { id: "0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6", username: 'shadowdancer' },
      { id: "9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3", username: 'frostpetal' },
      { id: "5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9", username: 'sagesecret' },
      { id: "1e2d3c4b5a6f7e8d9c0b1a2d3c4b5a6f7", username: 'meadowlark' }
    ],
  },
  {
    name: 'zephyr-cloud',
    address: '172.31.100.50',
    lastPing: new Date('2024-02-19T12:05:18'),
    registered: new Date('2024-01-22T13:30:00'),
    storages: [
      { id: "d1e2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7", username: 'obsidianmirror' }
    ],
  },
  {
    name: 'forge-data',
    address: '192.168.0.99',
    lastPing: new Date('2024-02-21T08:15:47'),
    registered: new Date('2023-12-24T23:59:59'),
    storages: [
      { id: "8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1", username: 'ironwill' },
      { id: "3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0", username: 'goldenleaf' },
      { id: "b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4", username: 'crystalveil' }
    ],
  },
  {
    name: 'archive-old',
    address: '10.10.10.200',
    lastPing: new Date('2024-02-14T20:00:00'),
    registered: new Date('2023-08-01T05:00:00'),
    storages: [
      { id: "e5f4d3c2b1a0e9f8d7c6b5a4f3e2d1c0b9", username: 'dustytome' },
      { id: "a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4", username: 'forgottenpath' },
      { id: "4f5e6d7c8b9a0f1e2d3c4b5a6f7e8d9c0b1", username: 'whisperingoak' },
      { id: "7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0", username: 'lonespire' }
    ],
  },
  {
    name: 'alpha-core',
    address: '10.0.0.45',
    lastPing: new Date('2024-02-20T14:22:15'),
    registered: new Date('2023-12-10T11:15:00'),
    storages: [
      { id: "a1b2c3d4e5f6789012345678901234567", username: 'silentvalley' },
      { id: "b2c3d4e5f6a7890123456789012345678", username: 'crimsonfalcon' }
    ],
  },
  {
    name: 'nebula-node',
    address: '172.16.254.3',
    lastPing: new Date('2024-02-19T23:59:01'),
    registered: new Date('2024-01-05T08:45:30'),
    storages: [
      { id: "f8e7d6c5b4a312345678901234567890", username: 'quantumleap' },
      { id: "09f8e7d6c5b432145678901234567890", username: 'solarsailor' },
      { id: "a0b1c2d3e4f5678987654321098765432", username: 'lunarshadow' }
    ],
  },
  {
    name: 'delta-storage-01',
    address: '192.168.86.201',
    lastPing: new Date('2024-02-18T09:10:05'),
    registered: new Date('2023-11-25T16:20:00'),
    storages: [
      { id: "11223344556677889900aabbccddeeff", username: 'emberglow' }
    ],
  },
  {
    name: 'echo-server',
    address: '10.1.1.100',
    lastPing: new Date('2024-02-21T01:45:50'),
    registered: new Date('2024-02-01T12:00:00'),
    storages: [
      { id: "ffeeddccbbaa00998877665544332211", username: 'oceanwhisper' },
      { id: "abcdef1234567890fedcba0987654321", username: 'mountaingaze' },
      { id: "aabbccddeeff00112233445566778899", username: 'desertwind' },
      { id: "99887766554433221100aabbccddeeff", username: 'forestecho' }
    ],
  },
  {
    name: 'omega-prime',
    address: '172.22.45.67',
    lastPing: new Date('2024-02-15T18:30:00'),
    registered: new Date('2023-10-15T14:25:10'),
    storages: [
      { id: "5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a", username: 'rustedcog' },
      { id: "a9b8c7d6e5f43a2b1c0d9e8f7a6b5c4d", username: 'violetstorm' }
    ],
  },
  {
    name: 'sigma-backup',
    address: '192.168.12.34',
    lastPing: new Date('2024-02-21T10:00:00'),
    registered: new Date('2024-01-18T17:45:00'),
    storages: [
      { id: "c0ffeec0ffeec0ffeec0ffeec0ffeec0", username: 'ancientdoor' },
      { id: "deafbeefdeafbeefdeafbeefdeafbeef", username: 'solitarypeak' },
      { id: "1234567890abcdef1234567890abcdef", username: 'wanderingriver' }
    ],
  },
  {
    name: 'tango-main',
    address: '10.50.100.150',
    lastPing: new Date('2024-02-20T16:45:22'),
    registered: new Date('2023-09-30T10:10:10'),
    storages: [
      { id: "fedcba0987654321abcdef1234567890", username: 'copperwire' },
      { id: "0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6", username: 'shadowdancer' },
      { id: "9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3", username: 'frostpetal' },
      { id: "5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9", username: 'sagesecret' },
      { id: "1e2d3c4b5a6f7e8d9c0b1a2d3c4b5a6f7", username: 'meadowlark' }
    ],
  },
  {
    name: 'zephyr-cloud',
    address: '172.31.100.50',
    lastPing: new Date('2024-02-19T12:05:18'),
    registered: new Date('2024-01-22T13:30:00'),
    storages: [
      { id: "d1e2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7", username: 'obsidianmirror' }
    ],
  },
  {
    name: 'forge-data',
    address: '192.168.0.99',
    lastPing: new Date('2024-02-21T08:15:47'),
    registered: new Date('2023-12-24T23:59:59'),
    storages: [
      { id: "8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1", username: 'ironwill' },
      { id: "3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0", username: 'goldenleaf' },
      { id: "b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4", username: 'crystalveil' }
    ],
  },
  {
    name: 'archive-old',
    address: '10.10.10.200',
    lastPing: new Date('2024-02-14T20:00:00'),
    registered: new Date('2023-08-01T05:00:00'),
    storages: [
      { id: "e5f4d3c2b1a0e9f8d7c6b5a4f3e2d1c0b9", username: 'dustytome' },
      { id: "a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4", username: 'forgottenpath' },
      { id: "4f5e6d7c8b9a0f1e2d3c4b5a6f7e8d9c0b1", username: 'whisperingoak' },
      { id: "7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0", username: 'lonespire' }
    ],
  },
];

export default sampleServerList;
