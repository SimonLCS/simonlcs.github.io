// Generated from content/*.json by npm run build-content.
window.siteContent = {
  "site": {
    "title": "Simon Lucas - Computer Graphics Researcher",
    "role": "Postdoctoral Researcher in Computer Graphics",
    "summary": "I work on light transport and appearance modeling, with a focus on physically based material models that remain useful for real-time rendering.",
    "bio": "I am a postdoctoral researcher at Inria Sophia-Antipolis in the GraphDeco team. My research explores how microscopic structure shapes material appearance, from porous layers and micrograin models to efficient sampling for real-time and physically based rendering.",
    "portrait": "https://simon-lucas.fr/wp-content/uploads/2020/11/photo_moi-e1606601269958-768x817.jpg",
    "portraitAlt": "Portrait of Simon Lucas",
    "links": [
      {
        "label": "Email",
        "url": "mailto:simon.lucas@inria.fr"
      },
      {
        "label": "Twitter",
        "url": "https://twitter.com/SimonLUCAS_CG"
      },
      {
        "label": "Shadertoy",
        "url": "https://www.shadertoy.com/user/SimonL"
      }
    ]
  },
  "news": [
    {
      "date": "2026-05-04",
      "displayDate": "May 2026",
      "category": "Paper",
      "title": "Gaussian splats intrinsic decomposition paper",
      "description": "Our paper Intrinsic decomposition and editing of 3D Gaussian splats has been accepted at PACMCGIT.",
      "links": [
        {
          "label": "HAL version",
          "url": "https://hal.science/hal-05602203v1"
        }
      ]
    },
    {
      "date": "2026-03-30",
      "displayDate": "March 2026",
      "category": "Paper",
      "title": "Polydisperse micrograin BSDF paper",
      "description": "Our paper A Discrete Polydisperse Anisotropic BSDF Model based on the Micrograin Framework has been accepted in Computer Graphics Forum.",
      "links": [
        {
          "label": "HAL version",
          "url": "https://hal.science/hal-05574460v2"
        }
      ]
    },
    {
      "date": "2025-06-01",
      "displayDate": "June 2025",
      "category": "Paper",
      "title": "EGSR 2025 paper accepted",
      "description": "Our paper Importance Sampling of the Micrograin Visible NDF has been accepted at EGSR 2025.",
      "links": [
        {
          "label": "Paper and code",
          "url": "https://diglib.eg.org/items/18f74b0f-95fb-4fe1-a562-82eb38f89fff"
        }
      ]
    },
    {
      "date": "2025-01-01",
      "displayDate": "2025",
      "category": "Position",
      "title": "Postdoctoral researcher at Inria Sophia-Antipolis",
      "description": "I joined the GraphDeco team, working on light transport and appearance modeling for real-time rendering.",
      "links": [
        {
          "label": "CV",
          "url": "./cv.html"
        }
      ]
    },
    {
      "date": "2025-02-01",
      "displayDate": "February 2025",
      "category": "Thesis",
      "title": "PhD thesis available on HAL",
      "description": "A Micrograin Formalism for the Rendering of Porous Materials is available online.",
      "links": [
        {
          "label": "HAL version",
          "url": "https://theses.hal.science/tel-04904484"
        }
      ]
    },
    {
      "date": "2024-05-01",
      "displayDate": "May 2024",
      "category": "Paper",
      "title": "SIGGRAPH 2024 paper",
      "description": "Our paper A Fully-correlated Anisotropic Micrograin BSDF Model has been accepted at SIGGRAPH 2024.",
      "links": [
        {
          "label": "Author version",
          "url": "https://hal.science/hal-04567402"
        }
      ]
    }
  ],
  "publications": [
    {
      "title": "Intrinsic decomposition and editing of 3D Gaussian splats",
      "kind": "Journal paper",
      "venue": "Proceedings of the ACM on Computer Graphics and Interactive Techniques, 2026",
      "authors": [
        "Alexandre Lanvin",
        "Simon Lucas",
        "Jeffrey Hu",
        "Adrien Bousseau",
        "George Drettakis"
      ],
      "abstract": "Intrinsic decomposition - which expresses image colors as the product of diffuse albedo and shading, possibly augmented with view-dependent residuals - has a long history in image editing as it enables the modification of object colors and textures without altering lighting. We extend intrinsic decomposition to radiance fields represented with Gaussian splatting by proposing solutions to three key aspects of such decomposition. First, we describe how to model the intrinsic decomposition as independent sets of Gaussian primitives, which allows each set to adapt to the characteristics of the layer it represents. Second, we present an optimization procedure guided by data-driven predictions to disentangle multi-view photographs of a scene into the aforementioned intrinsic sets. Finally, we provide an editing workflow where users modify the texture of planar surfaces simply by modifying the albedo of that surface in one image. Capturing this edit within the intrinsic radiance field allows re-rendering of the edited scene with plausible lighting under arbitrary viewpoints.",
      "image": "https://thumb.ccsd.cnrs.fr/9913424/large",
      "imageAlt": "First-page illustration for Intrinsic decomposition and editing of 3D Gaussian splats",
      "links": [
        {
          "label": "HAL version",
          "url": "https://hal.science/hal-05602203v1"
        },
        {
          "label": "DOI",
          "url": "https://doi.org/10.1145/3804495"
        }
      ]
    },
    {
      "title": "A Discrete Polydisperse Anisotropic BSDF Model based on the Micrograin Framework",
      "kind": "Journal paper",
      "venue": "Computer Graphics Forum, 2026",
      "authors": [
        "Kewei Xu",
        "Simon Lucas",
        "Mickael Ribardiere",
        "Benjamin Bringier",
        "Pascal Barla"
      ],
      "abstract": "We introduce a discrete polydisperse micrograin BSDF model for the rendering of porous surface materials composed of microscopic elements of different size, shape and reflectance distributed on a bulk medium. Our approach generalizes the anisotropic monodisperse micrograin model. We first reformulate it in a non-axis-aligned configuration, allowing for the later combination of different micrograin types elongated in arbitrary directions. We then extend the monodisperse model to the polydisperse case, deriving its three key components: (i) a general filling factor that controls the mix between micrograins and the bulk medium; (ii) an exact normal distribution function for surfaces composed of polydisperse micrograin distributions; and (iii) the corresponding fully-correlated shadowing and masking term. This results in an analytical single-scattering BSDF for discrete polydisperse surface materials, validated over ground truth simulations, for which we also derive a dedicated importance sampling procedure. Our model supports varying heights and anisotropy orientations of different micrograin types as input, giving additional control to simulate phenomena like retro-reflection from mixed materials, color mixture depending on lighting and observation directions, and multiple directions of anisotropy.",
      "image": "https://thumb.ccsd.cnrs.fr/9907542/large",
      "imageAlt": "HAL thumbnail for A Discrete Polydisperse Anisotropic BSDF Model based on the Micrograin Framework",
      "links": [
        {
          "label": "HAL version",
          "url": "https://hal.science/hal-05574460v2"
        },
        {
          "label": "DOI",
          "url": "https://doi.org/10.1111/cgf.70387"
        }
      ]
    },
    {
      "title": "Importance Sampling of the Micrograin Visible NDF",
      "kind": "Journal paper",
      "venue": "EGSR, Computer Graphics Forum, 2025",
      "authors": [
        "Simon Lucas",
        "Romain Pacanowski",
        "Pascal Barla"
      ],
      "abstract": "Importance sampling of visible normal distribution functions (vNDF) is a required ingredient for the efficient rendering of microfacet-based materials. In this paper, we explain how to sample the vNDF for the micrograin material model [LRPB23], which has been recently improved to handle height-normal correlations through a new Geometric Attenuation Factor (GAF) [LRPB24], leading to a stronger impact on appearance compared to the earlier Smith approximation. To this end, we make two contributions: we derive analytic expressions for the marginal and conditional cumulative distribution functions (CDFs) of the vNDF; we provide efficient methods for inverting these CDFs based respectively on a 2D lookup table and on the triangle-cut method [Hei20].",
      "image": "https://simon-lucas.fr/wp-content/uploads/2025/06/rep_img_egsr2025-1024x320.jpg",
      "imageAlt": "Teaser image for importance sampling of the micrograin visible NDF",
      "links": [
        {
          "label": "Paper and code",
          "url": "https://diglib.eg.org/items/18f74b0f-95fb-4fe1-a562-82eb38f89fff"
        }
      ]
    },
    {
      "title": "A Micrograin Formalism for the Rendering of Porous Materials",
      "kind": "Thesis",
      "venue": "PhD Thesis, University of Bordeaux, 2024",
      "authors": [
        "Simon Lucas"
      ],
      "abstract": "This thesis focuses on the impact of microscopic structures on material appearance, with a particular emphasis on porous materials. We first evaluated existing appearance models by conducting light transport simulations on sphere aggregates representing porous volumes. We found that none of the existing models accurately matched the simulations, with most errors arising from surface effects. This opened the path to the development of a specialized Bidirectional Scattering Distribution Function (BSDF) model for rendering porous layers, such as those found on surfaces covered with dust, rust, or dirt. Our model extends the Trowbridge-Reitz (GGX) distribution to handle pores between elliptical opaque micrograins and introduces a view- and light-dependent filling factor to blend porous and base layers. By adding height-normal and light-view correlations in the masking and shadowing terms, our model produces realistic effects seen in real world materials that were previously hardly obtainable like retro-reflection and height-color correlations. To improve the rendering efficiency of micrograin materials, we introduce an efficient importance sampling routine for visible Normal Distribution Functions (vNDF). Through numerical simulations, we validate the accuracy of our model. Finally, our work provides a comprehensive formalism for rendering porous layers and opens many perspectives for future work.",
      "image": "https://simon-lucas.fr/wp-content/uploads/2025/02/cap_these.png",
      "imageAlt": "Thesis cover preview",
      "links": [
        {
          "label": "HAL version",
          "url": "https://theses.hal.science/tel-04904484"
        }
      ]
    },
    {
      "title": "A Fully-correlated Anisotropic Micrograin BSDF Model",
      "kind": "Journal paper",
      "venue": "SIGGRAPH, ACM Transactions on Graphics, 2024",
      "authors": [
        "Simon Lucas",
        "Mickael Ribardiere",
        "Romain Pacanowski",
        "Pascal Barla"
      ],
      "abstract": "We introduce an improved version of the micrograin BSDF model [Lucas et al. 2023] for the rendering of anisotropic porous layers. Our approach leverages the properties of micrograins to take into account the correlation between their height and normal, as well as the correlation between the light and view directions. This allows us to derive an exact analytical expression for the Geometrical Attenuation Factor (GAF), summarizing shadowing and masking inside the porous layer. This fully-correlated GAF is then used to define appropriate mixing weights to blend the BSDFs of the porous and base layers. Furthermore, by generalizing the micrograins shape to anisotropy, combined with their fully-correlated GAF, our improved BSDF model produces effects specific to porous layers such as retro-reflection visible on dust layers at grazing angles or height and color correlation that can be found on rusty materials. Finally, we demonstrate very close matches between our BSDF model and light transport simulations realized with explicit instances of micrograins, thus validating our model.",
      "image": "https://simon-lucas.fr/wp-content/uploads/2024/05/rep_image_sig-1024x368.jpg",
      "imageAlt": "Rendered porous material results for the SIGGRAPH 2024 micrograin BSDF paper",
      "links": [
        {
          "label": "Author version",
          "url": "https://hal.science/hal-04567402"
        }
      ]
    },
    {
      "title": "A Micrograin BSDF Model for the Rendering of Porous Layers",
      "kind": "Conference paper",
      "venue": "SIGGRAPH Asia, Conference Track, 2023",
      "authors": [
        "Simon Lucas",
        "Mickael Ribardiere",
        "Romain Pacanowski",
        "Pascal Barla"
      ],
      "abstract": "We introduce a new BSDF model for the rendering of porous layers, as found on surfaces covered by dust, rust, dirt, or sprayed paint. Our approach is based on a distribution of elliptical opaque micrograins, extending the Trowbridge-Reitz (GGX) distribution [Trowbridge and Reitz 1975; Walter et al. 2007] to handle pores (i.e., spaces between micrograins). We use distance field statistics to derive the corresponding Normal Distribution Function (NDF) and Geometric Attenuation Factor (GAF), as well as a view- and light-dependent filling factor to blend between the porous and base layers. All the derived terms show excellent agreement when compared against numerical simulations. Our approach has several advantages compared to previous work [d'Eon et al. 2023; Merillou et al. 2000; Wang et al. 2022]. First, it decouples structural and reflectance parameters, leading to an analytical single-scattering formula regardless of the choice of micrograin reflectance. Second, we show that the classical texture maps (albedo, roughness, etc.) used for spatially-varying material parameters are easily retargeted to work with our model. Finally, the BRDF parameters of our model behave linearly, granting direct multi-scale rendering using classical mip mapping.",
      "image": "https://simon-lucas.fr/wp-content/uploads/2023/09/rep_image-1024x683.jpg",
      "imageAlt": "Teaser render for the SIGGRAPH Asia 2023 micrograin BSDF model",
      "links": [
        {
          "label": "Author version",
          "url": "https://hal.science/hal-04220006"
        },
        {
          "label": "Demo page",
          "url": "https://simon-lucas.fr/demo/demo.html"
        }
      ]
    },
    {
      "title": "Analyse Numerique de Modeles de Materiaux Poreux",
      "kind": "Workshop paper",
      "venue": "JFIG, Journees Francaises de l'Informatique Graphique, 2022",
      "award": "3rd Best Paper Award",
      "authors": [
        "Simon Lucas",
        "Romain Pacanowski",
        "Pascal Barla"
      ],
      "abstract": "L'apparence des objets est impactée par leur structure microscopique. Ici nous nous intéressons à l'apparence de matériaux poreux. La présence de pores a été modélisée de deux manières dans les travaux existants : en modifiant l'état de surface d'un matériau, ou en modifiant ses propriétés volumiques. Il n'existe cependant pas de modèle de matériaux poreux suffisamment générique pour tenir compte à la fois des effets surfaciques et volumiques. Nous proposons dans cet article une étude de ces effets à l'aide de simulations du transport de la lumière. Cette approche permet de révéler les limitations des modèles existants, ainsi que des pistes prometteuses pour le développement futur d'un modèle de matériau suffisamment général pour tenir compte de variations de porosités et d'état de surface.",
      "image": "https://simon-lucas.fr/wp-content/uploads/2023/09/teaser_jfig-1024x365.jpg",
      "imageAlt": "Teaser image for porous material numerical analysis",
      "links": [
        {
          "label": "Author version",
          "url": "https://hal.science/hal-03952096"
        }
      ]
    },
    {
      "title": "Real-Time Geometric Glint Anti-Aliasing with Normal Map Filtering",
      "kind": "Conference paper",
      "venue": "I3D, Proceedings of the ACM on Computer Graphics and Interactive Techniques, 2021",
      "authors": [
        "Xavier Chermain",
        "Simon Lucas",
        "Basile Sauvage",
        "Jean-Michel Dischler",
        "Carsten Dachsbacher"
      ],
      "abstract": "Real-time geometric specular anti-aliasing is required when using a low number of pixel samples and high-frequency specular lobes. Several methods have been proposed for mono-lobe bidirectional reflection distribution functions (BRDFs), but none for multi-lobe BRDFs, e.g., a glinty BRDF. We present the first method for real-time geometric glint anti-aliasing (GGAA). It eliminates most of the inconsistent appearing and disappearing of glints on surfaces with significant curvatures during animations. The technique uses the glinty BRDF of Chermain et al. [2020] and leverages hardware GPU-filtering of textures to filter slope distributions on the fly. We also improve this glinty BRDF by adding a correlation factor of slope. This BRDF parameter allows convergence to normal distribution functions that are not aligned on the surface's axes. Above all, this parameter makes glint rendering compatible with normal map filtering using LEAN mapping. Using GGAA increases the rendering time from 0.6% to 4.2% and it requires 1/3 more memory due to MIP mapping of tabulated slope distributions. The results are compared with references using a thousand samples per pixel.",
      "image": "https://simon-lucas.fr/wp-content/uploads/2021/03/i3D2021-1024x395.png",
      "imageAlt": "Rendered glint anti-aliasing comparison for I3D 2021",
      "links": [
        {
          "label": "Author version",
          "url": "http://igg.unistra.fr/People/chermain/assets/pdf/Chermain2021RealTime.pdf"
        },
        {
          "label": "Project page",
          "url": "http://igg.unistra.fr/People/chermain/glint_anti_aliasing/"
        },
        {
          "label": "Video",
          "url": "http://igg.unistra.fr/People/chermain/assets/mp4/i3D2021SupplementalVideo.mp4"
        },
        {
          "label": "Code",
          "url": "https://github.com/ASTex-ICube/aa_real_time_glint"
        }
      ]
    }
  ],
  "cv": {
    "experience": [
      {
        "date": "2025 - present",
        "title": "Postdoctoral Researcher",
        "place": "Inria Sophia-Antipolis, GraphDeco team",
        "details": [
          "Physically based rendering",
          "Light transport",
          "Real-time rendering"
        ]
      },
      {
        "date": "2021 - 2024",
        "title": "PhD Student",
        "place": "Inria Bordeaux, Manao team, University of Bordeaux",
        "details": [
          "Appearance modeling for porous materials",
          "Physically based rendering"
        ]
      },
      {
        "date": "September 2020 - August 2021",
        "title": "Apprenticeship",
        "place": "ICube laboratory, University of Strasbourg",
        "details": [
          "Real-time rendering of glints",
          "Procedural texture generation"
        ]
      },
      {
        "date": "July 2019 - August 2019",
        "title": "Third-year Internship",
        "place": "United Visual Researchers, Paris",
        "details": [
          "BRDF fitting",
          "Shader programming in Unity"
        ]
      },
      {
        "date": "June 2017 - July 2017",
        "title": "First-year Internship",
        "place": "OPEX MEDIA / USE TOGETHER, Reims",
        "details": [
          "RPM package automation on CentOS 7",
          "Beta testing"
        ]
      }
    ],
    "education": [
      {
        "date": "2019 - 2021",
        "title": "Master in Computer Science, Image and 3D",
        "place": "University of Strasbourg",
        "details": [
          "Engineering degree in computer graphics, virtual reality, interactions, and games"
        ]
      },
      {
        "date": "2016 - 2019",
        "title": "Bachelor in Computer Science",
        "place": "University of Strasbourg",
        "details": []
      },
      {
        "date": "2016",
        "title": "Scientific Baccalaureat",
        "place": "Lycee Marc Chagall, Reims",
        "details": [
          "Mention Good",
          "English European section"
        ]
      }
    ],
    "sidebars": [
      {
        "title": "Reviewing",
        "items": [
          "SIGGRAPH 2024",
          "I3D 2024"
        ]
      },
      {
        "title": "Skills",
        "items": [
          "Python, C++, C",
          "OpenGL, GLSL",
          "OptiX / CUDA",
          "Compute shaders",
          "Ray tracing",
          "Physically based rendering",
          "Procedural rendering",
          "Implicit surfaces",
          "Deep learning"
        ]
      },
      {
        "title": "Languages",
        "items": [
          "French, native",
          "English"
        ]
      },
      {
        "title": "Awards",
        "items": [
          "JFIG 2022, 3rd Best Paper Award",
          "JFIG 2020, Best shader at Shadertoy rendering contest",
          "Nuit de l'Informatique 2018 awards"
        ]
      },
      {
        "title": "Interests",
        "items": [
          "Climbing",
          "Archery",
          "Video games",
          "Coding and 3D rendering"
        ]
      }
    ]
  },
  "portfolio": [
    {
      "title": "LilTracer",
      "year": "2021",
      "description": "A small GPU path tracer built for a university project. The renderer runs with OpenGL and sends scene data such as BVHs, meshes, and materials to the GPU through textures.",
      "tags": [
        "OpenGL",
        "Path tracing"
      ],
      "images": [
        {
          "src": "https://simon-lucas.fr/wp-content/uploads/2023/10/titlepic.png-768x768.png",
          "alt": "LilTracer rendered scene"
        }
      ],
      "links": []
    },
    {
      "title": "Oeuf de Faberge",
      "year": "2020",
      "description": "Best shader at the JFIG 2020 Shadertoy rendering contest, organized by the French computer graphics association AFIG.",
      "tags": [
        "Shader",
        "Shadertoy"
      ],
      "images": [
        {
          "src": "https://simon-lucas.fr/wp-content/uploads/2020/11/faberge_egg-768x432.png",
          "alt": "Faberge egg shader render"
        }
      ],
      "links": [
        {
          "label": "Shadertoy",
          "url": "https://www.shadertoy.com/view/3scBD7"
        },
        {
          "label": "Contest",
          "url": "https://jfig2020.sciencesconf.org/resource/page/id/1"
        },
        {
          "label": "Slides",
          "url": "https://simon-lucas.fr/wp-content/uploads/2020/11/Presentation_JFIG_Simon_LUCAS.pdf"
        }
      ]
    },
    {
      "title": "Analytic Normal Filtering from Sum of Cosines",
      "year": "2020",
      "description": "A method to extract anti-aliased normals from a sum of cosine functions with varying amplitude, frequency, and phase.",
      "tags": [
        "Filtering",
        "Shader"
      ],
      "images": [
        {
          "src": "https://simon-lucas.fr/wp-content/uploads/2020/11/filtering_normal_map1-768x432.png",
          "alt": "Filtered normal map result"
        },
        {
          "src": "https://simon-lucas.fr/wp-content/uploads/2020/11/filtering_normal_map2-768x432.png",
          "alt": "Normal filtering comparison"
        }
      ],
      "links": [
        {
          "label": "Shadertoy",
          "url": "https://www.shadertoy.com/view/ts3BWn"
        }
      ]
    },
    {
      "title": "Filtering Color Mapped Textures and Surfaces",
      "year": "2020",
      "description": "Course research work implementing the filtering method from Heitz et al. for color-mapped textures and surfaces.",
      "tags": [
        "Texture filtering",
        "Research implementation"
      ],
      "images": [
        {
          "src": "https://simon-lucas.fr/wp-content/uploads/2020/11/filt_colormapped.png",
          "alt": "Color mapped texture filtering result"
        }
      ],
      "links": [
        {
          "label": "Paper",
          "url": "https://hal.inria.fr/hal-00765799/"
        },
        {
          "label": "Shadertoy",
          "url": "https://www.shadertoy.com/view/WdScDW"
        },
        {
          "label": "Report",
          "url": "https://simon-lucas.fr/wp-content/uploads/2020/11/Rapport_TER.pdf"
        }
      ]
    },
    {
      "title": "First OpenGL Application",
      "year": "2020",
      "description": "A 3D programming project with deferred rendering, GGX BRDFs, normal mapping, Assimp loading, and an ImGui-based interface.",
      "tags": [
        "C++",
        "OpenGL"
      ],
      "images": [
        {
          "src": "https://simon-lucas.fr/wp-content/uploads/2020/11/pbr1-1024x605.png",
          "alt": "OpenGL physically based rendering scene"
        },
        {
          "src": "https://simon-lucas.fr/wp-content/uploads/2020/11/pbr2-1024x605.png",
          "alt": "OpenGL rendered material preview"
        },
        {
          "src": "https://simon-lucas.fr/wp-content/uploads/2020/11/pbr3-1024x605.png",
          "alt": "OpenGL application screenshot"
        },
        {
          "src": "https://simon-lucas.fr/wp-content/uploads/2020/11/pbr4-1024x605.png",
          "alt": "OpenGL deferred rendering result"
        }
      ],
      "links": []
    }
  ]
};
