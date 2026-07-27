import { useState } from 'react'
import './App.css'

type VehicleVariant = {
  id: string
  label: string
}

type VehicleModel = {
  id: string
  name: string
  variants: VehicleVariant[]
}

type VehicleBrand = {
  id: string
  name: string
  models: VehicleModel[]
}

type Material = {
  id: string
  name: string
  description: string
}

const vehicles: VehicleBrand[] = [
  {
    id: 'fiat',
    name: 'FIAT',
    models: [
      {
        id: 'ducato',
        name: 'Ducato',
        variants: [
          { id: 'fiat-ducato-13m3', label: '13 m³' },
          { id: 'fiat-ducato-15m3', label: '15 m³' },
          { id: 'fiat-ducato-17m3', label: '17 m³' },
        ],
      },
    ],
  },
  {
    id: 'peugeot',
    name: 'PEUGEOT',
    models: [
      {
        id: 'boxer',
        name: 'Boxer',
        variants: [
          { id: 'peugeot-boxer-13m3', label: '13 m³' },
          { id: 'peugeot-boxer-15m3', label: '15 m³' },
          { id: 'peugeot-boxer-17m3', label: '17 m³' },
        ],
      },
    ],
  },
  {
    id: 'citroen',
    name: 'CITROËN',
    models: [
      {
        id: 'jumper',
        name: 'Jumper',
        variants: [
          { id: 'citroen-jumper-13m3', label: '13 m³' },
          { id: 'citroen-jumper-15m3', label: '15 m³' },
          { id: 'citroen-jumper-17m3', label: '17 m³' },
        ],
      },
    ],
  },
  {
    id: 'ford',
    name: 'FORD',
    models: [
      {
        id: 'transit',
        name: 'Transit',
        variants: [
          { id: 'ford-transit-11-5m3', label: '11,5 m³' },
          { id: 'ford-transit-13m3', label: '13 m³' },
          { id: 'ford-transit-15-1m3', label: '15,1 m³' },
        ],
      },
      {
        id: 'transit-custom',
        name: 'Transit Custom',
        variants: [
          { id: 'ford-transit-custom-5-8m3', label: '5,8 m³' },
          { id: 'ford-transit-custom-6-8m3', label: '6,8 m³' },
        ],
      },
    ],
  },
  {
    id: 'mercedes',
    name: 'MERCEDES',
    models: [
      {
        id: 'sprinter',
        name: 'Sprinter',
        variants: [
          { id: 'mercedes-sprinter-11m3', label: '11 m³' },
          { id: 'mercedes-sprinter-14m3', label: '14 m³' },
          { id: 'mercedes-sprinter-17m3', label: '17 m³' },
        ],
      },
    ],
  },
  {
    id: 'volkswagen',
    name: 'VOLKSWAGEN',
    models: [
      {
        id: 'crafter',
        name: 'Crafter',
        variants: [
          { id: 'volkswagen-crafter-11m3', label: '11 m³' },
          { id: 'volkswagen-crafter-14m3', label: '14 m³' },
          { id: 'volkswagen-crafter-17m3', label: '17 m³' },
        ],
      },
    ],
  },
  {
    id: 'renault',
    name: 'RENAULT',
    models: [
      {
        id: 'master',
        name: 'Master',
        variants: [
          { id: 'renault-master-13m3', label: '13 m³' },
          { id: 'renault-master-15m3', label: '15 m³' },
          { id: 'renault-master-17m3', label: '17 m³' },
        ],
      },
    ],
  },
  {
    id: 'opel',
    name: 'OPEL',
    models: [
      {
        id: 'movano',
        name: 'Movano',
        variants: [
          { id: 'opel-movano-13m3', label: '13 m³' },
          { id: 'opel-movano-15m3', label: '15 m³' },
          { id: 'opel-movano-17m3', label: '17 m³' },
        ],
      },
    ],
  },
]

const materials: Material[] = [
  {
    id: 'marine-plywood',
    name: 'Kayın-Marin Su Kontrası',
    description: 'Suya dayanıklı kayın marin kontra',
  },
  {
    id: 'film-faced-plywood',
    name: 'Filmli Kontra Plywood',
    description: 'Dayanıklı film kaplı plywood',
  },
  {
    id: 'mdf',
    name: 'Ham MDF',
    description: 'Yüzeyi işlenmemiş MDF',
  },
  {
    id: 'vinyl-coated-mdf',
    name: 'MDF üzeri muşamba',
    description: 'MDF üzeri koruyucu muşamba kaplama',
  },
  {
    id: 'checker-plate-plywood',
    name: 'Kontra üzeri çetalı alüminyum',
    description: 'Kontra üzeri desenli alüminyum kaplama',
  },
]

function App() {
  const [openBrandId, setOpenBrandId] = useState<string | null>('fiat')
  const [openModelId, setOpenModelId] = useState<string | null>('ducato')
  const [selectedVehicleId, setSelectedVehicleId] = useState(
    'fiat-ducato-13m3',
  )
  const [selectedMaterialId, setSelectedMaterialId] =
    useState('marine-plywood')
    const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null)
const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null)
const [rearDoorsMaterialId, setRearDoorsMaterialId] = useState<string | null>(null)

  const selectedVehicle = vehicles
    .flatMap((brand) =>
      brand.models.flatMap((model) =>
        model.variants.map((variant) => ({
          brand: brand.name,
          model: model.name,
          variant,
        })),
      ),
    )
    .find((item) => item.variant.id === selectedVehicleId)

  const toggleBrand = (brand: VehicleBrand) => {
    const willOpen = openBrandId !== brand.id

    setOpenBrandId(willOpen ? brand.id : null)
    setOpenModelId(
      willOpen && brand.models.length === 1 ? brand.models[0].id : null,
    )
  }

  const toggleModel = (modelId: string) => {
    setOpenModelId((current) => (current === modelId ? null : modelId))
  }

  const showRealDucato =
    selectedVehicleId === 'fiat-ducato-13m3'

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-mark" aria-hidden="true">
          ▣
        </div>

        <div className="brand-copy">
          <h1>Panelvan Studio</h1>
          <p>Panelvan İç Kaplama Konfigüratörü</p>
        </div>
      </header>

      <main className="workspace">
        <aside className="sidebar vehicle-sidebar">
          <p className="section-label">ARAÇLAR</p>

          <div className="vehicle-list">
            {vehicles.map((brand) => {
              const brandOpen = openBrandId === brand.id

              return (
                <div className="vehicle-brand" key={brand.id}>
                  <button
                    className={`brand-row ${
                      brandOpen ? 'active-brand' : ''
                    }`}
                    type="button"
                    onClick={() => toggleBrand(brand)}
                    aria-expanded={brandOpen}
                  >
                    <span>{brand.name}</span>

                    <span className="chevron" aria-hidden="true">
                      {brandOpen ? '⌄' : '›'}
                    </span>
                  </button>

                  {brandOpen && (
                    <div className="brand-content">
                      {brand.models.map((model) => {
                        const modelOpen = openModelId === model.id

                        return (
                          <div className="model-block" key={model.id}>
                            <button
                              className="model-row"
                              type="button"
                              onClick={() => toggleModel(model.id)}
                              aria-expanded={modelOpen}
                            >
                              <span>{model.name}</span>

                              <span className="chevron" aria-hidden="true">
                                {modelOpen ? '⌄' : '›'}
                              </span>
                            </button>

                            {modelOpen && (
                              <div className="variant-list">
                                {model.variants.map((variant) => {
                                  const selected =
                                    variant.id === selectedVehicleId

                                  return (
                                    <button
                                      className={`variant-button ${
                                        selected ? 'selected' : ''
                                      }`}
                                      key={variant.id}
                                      type="button"
                                      onClick={() =>
                                        setSelectedVehicleId(variant.id)
                                      }
                                    >
                                      <span
                                        className="radio-dot"
                                        aria-hidden="true"
                                      />
                                      <span>{variant.label}</span>
                                    </button>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </aside>

        <section className="viewer-column">
          <div className="selected-vehicle-label">
            {selectedVehicle
              ? `${selectedVehicle.brand} ${selectedVehicle.model} · ${selectedVehicle.variant.label}`
              : 'Araç seçilmedi'}
          </div>

          <div className="viewer-card">
            {showRealDucato ? (
              <div className="vehicle-stage">
  <img
    className="vehicle-image"
    src="/vehicles/fiat/ducato/13m3/base.webp"
    alt="FIAT Ducato 13 m³ arka iç görünüm"
  />

  <svg
    className="vehicle-overlay"
    viewBox="0 0 1648 928"
    preserveAspectRatio="xMidYMid meet"
    aria-label="Araç kaplama bölgeleri"
  >
    <defs>
  <pattern
    id="marine-plywood-pattern"
    patternUnits="userSpaceOnUse"
    width="420"
    height="280"
  >
    <image
      href="/materials/marine-plywood/texture.png"
      x="0"
      y="0"
      width="420"
      height="280"
      preserveAspectRatio="xMidYMid slice"
    />
  </pattern>
</defs>

    {/* ARKA KAPILARA UYGULANMIŞ MALZEME */}
<g
  className="rear-doors-material"
  fill={
    rearDoorsMaterialId === 'marine-plywood'
      ? 'url(#marine-plywood-pattern)'
      : 'none'
  }
  stroke="none"
  pointerEvents="none"
>
  {/* SOL ARKA KAPI — üst panel */}
  <path
    d="
      M 111 225
      Q 111 207 129 207
      L 338 207
      Q 359 207 359 228
      L 359 421
      Q 359 449 331 449
      L 139 449
      Q 111 449 111 421
      Z
    "
  />

  {/* SOL ARKA KAPI — alt panel */}
  <path
    d="
      M 80 515
      L 364 515
      L 364 788
      L 80 788
      Z
    "
  />

  {/* SAĞ ARKA KAPI — üst panel */}
  <path
    d="
      M 1290 228
      Q 1290 207 1311 207
      L 1521 207
      Q 1538 207 1538 225
      L 1538 421
      Q 1538 449 1510 449
      L 1318 449
      Q 1290 449 1290 421
      Z
    "
  />

  {/* SAĞ ARKA KAPI — alt panel */}
  <path
    d="
      M 1284 515
      L 1568 515
      L 1568 788
      L 1284 788
      Z
    "
  />
</g>

{/* ARKA KAPILAR ETKİLEŞİM KATMANI */}
<g
  className="rear-doors-hit-area"
  fill={
    hoveredRegionId === 'rearDoors'
      ? 'rgba(234, 91, 12, 0.18)'
      : 'transparent'
  }
  stroke={
    hoveredRegionId === 'rearDoors'
      ? '#ea5b0c'
      : 'transparent'
  }
  strokeWidth="5"
  strokeLinejoin="round"
  pointerEvents="all"
  style={{ cursor: 'pointer' }}
  onMouseEnter={() => setHoveredRegionId('rearDoors')}
  onMouseLeave={() => setHoveredRegionId(null)}
  onClick={() => {
    setSelectedRegionId('rearDoors')
    setRearDoorsMaterialId(selectedMaterialId)
  }}
  role="button"
  aria-label="Arka Kapılar"
>
  {/* SOL ARKA KAPI — üst panel */}
  <path
    d="
      M 111 225
      Q 111 207 129 207
      L 338 207
      Q 359 207 359 228
      L 359 421
      Q 359 449 331 449
      L 139 449
      Q 111 449 111 421
      Z
    "
  />

  {/* SOL ARKA KAPI — alt panel */}
  <path
    d="
      M 80 515
      L 364 515
      L 364 788
      L 80 788
      Z
    "
  />

  {/* SAĞ ARKA KAPI — üst panel */}
  <path
    d="
      M 1290 228
      Q 1290 207 1311 207
      L 1521 207
      Q 1538 207 1538 225
      L 1538 421
      Q 1538 449 1510 449
      L 1318 449
      Q 1290 449 1290 421
      Z
    "
  />

  {/* SAĞ ARKA KAPI — alt panel */}
  <path
    d="
      M 1284 515
      L 1568 515
      L 1568 788
      L 1284 788
      Z
    "
  />
</g>
{/* TABAN */}
<path
 d="
  M 615 685
  L 1033 685

  L 1040 735
  L 1060 765

  L 1120 765
  L 1120 805

  L 528 805
  L 528 765

  L 588 765
  L 608 735

  Z
"
  fill={
    hoveredRegionId === 'floor'
      ? 'rgba(234, 91, 12, 0.38)'
      : 'transparent'
  }
  stroke={
    hoveredRegionId === 'floor'
      ? '#ea5b0c'
      : 'transparent'
  }
  strokeWidth="5"
  strokeLinejoin="round"
  pointerEvents="all"
  style={{ cursor: 'pointer' }}
  onMouseEnter={() => setHoveredRegionId('floor')}
  onMouseLeave={() => setHoveredRegionId(null)}
  onClick={() => setSelectedRegionId('floor')}
/>
 {/* ARA BÖLME ETKİLEŞİM ALANI */}
<path
  d="
    M 639 206
    L 985 206

    L 1021 249
    L 1056 649

    L 1045 685
    L 603 685

    L 585 639
    L 596 249

    Z

    M 740 310
    Q 740 300 750 300
    L 898 300
    Q 908 300 908 310
    L 908 390
    Q 908 400 898 400
    L 750 400
    Q 740 400 740 390
    Z
  "
  fillRule="evenodd"
  clipRule="evenodd"
  fill={
    hoveredRegionId === 'partition'
      ? 'rgba(234, 91, 12, 0.38)'
      : 'transparent'
  }
  stroke={
    hoveredRegionId === 'partition'
      ? '#ea5b0c'
      : 'transparent'
  }
  strokeWidth="5"
  strokeLinejoin="round"
  pointerEvents="all"
  style={{ cursor: 'pointer' }}
  onMouseEnter={() => setHoveredRegionId('partition')}
  onMouseLeave={() => setHoveredRegionId(null)}
  onClick={() => setSelectedRegionId('partition')}
  role="button"
  aria-label="Ara Bölme"
/>
{/* ÇAMURLUKLAR ETKİLEŞİM ALANI */}
<g
  fill={
    hoveredRegionId === 'wheelArches'
      ? 'rgba(234, 91, 12, 0.38)'
      : 'transparent'
  }
  stroke={
    hoveredRegionId === 'wheelArches'
      ? '#ea5b0c'
      : 'transparent'
  }
  strokeWidth="5"
  strokeLinejoin="round"
  pointerEvents="all"
  style={{ cursor: 'pointer' }}
  onMouseEnter={() => setHoveredRegionId('wheelArches')}
  onMouseLeave={() => setHoveredRegionId(null)}
  onClick={() => setSelectedRegionId('wheelArches')}
  role="button"
  aria-label="Çamurluklar"
>
  {/* SOL ÇAMURLUK KUTUSU */}
  <path
    d="
      M 505 630
      L 600 630
      L 600 750
      L 575 780
      L 505 780
      Z
    "
  />

  <path
    d="
      M 505 630
      L 600 630
      L 575 670
      L 505 670
      Z
    "
  />

  <path
    d="
      M 575 670
      L 600 630
      L 600 750
      L 575 780
      Z
    "
  />

  {/* SAĞ ÇAMURLUK KUTUSU */}
  <path
    d="
      M 1048 630
      L 1143 630
      L 1143 780
      L 1073 780
      L 1048 750
      Z
    "
  />

  <path
    d="
      M 1048 630
      L 1143 630
      L 1143 670
      L 1073 670
      Z
    "
  />

  <path
    d="
      M 1048 630
      L 1073 670
      L 1073 780
      L 1048 750
      Z
    "
  />
</g>
  </svg>
</div>
            ) : (
              <div className="viewer-placeholder">
                <div className="van-icon" aria-hidden="true">
                  <div className="van-body" />
                  <div className="van-wheel left" />
                  <div className="van-wheel right" />
                </div>

                <p>Bu araç için gerçek görsel henüz eklenmedi.</p>
              </div>
            )}
          </div>
        </section>

        <aside className="sidebar material-sidebar">
          <p className="section-label">MALZEMELER</p>

          <div className="material-list">
            {materials.map((material) => {
              const selected = material.id === selectedMaterialId

              return (
                <button
                  className={`material-row ${
                    selected ? 'selected' : ''
                  }`}
                  key={material.id}
                  type="button"
                  onClick={() => setSelectedMaterialId(material.id)}
                >
                  <span
                    className={`material-thumb material-thumb-${material.id}`}
                    aria-hidden="true"
                  />

                  <span className="material-copy">
                    <strong>{material.name}</strong>
                    <span>{material.description}</span>
                  </span>

                  <span className="material-selector" aria-hidden="true">
                    {selected ? '✓' : ''}
                  </span>
                </button>
              )
            })}
          </div>
        </aside>
      </main>
    </div>
  )
}

export default App