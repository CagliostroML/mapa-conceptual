"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { Book, Lightbulb, User, MessageSquare, Brain, GraduationCap, Settings } from 'lucide-react'

const conceptsData = [
  {
    title: "Aprendizaje",
    icon: <Book className="w-8 h-8 text-orange-500" />,
    definitions: [
      {
        type: "Definiciones",
        icon: <Lightbulb className="w-5 h-5 text-gray-700 dark:text-gray-100" />,
        items: [
          "Adquisición de conocimientos, especialmente en algún arte u oficio. (Diccionario Espasa-Calpe, 2005)",
          "Creación de estructuras de conocimiento mediante la relación sustantiva entre la nueva información y las ideas previas de los estudiantes. (Frida Díaz Barriga, citada por Machorro Cabello & Valdez Fuentes, 2017)",
        ],
      },
      {
        type: "Definición propia",
        icon: <User className="w-5 h-5 text-gray-700 dark:text-gray-100" />,
        items: [
          "Adquisición de conocimientos o habilidades nuevas, de forma más o menos permanente, a través de la enseñanza o de las experiencias vividas.",
        ],
      },
    ],
  },
  {
    title: "Enseñanza",
    icon: <MessageSquare className="w-8 h-8 text-orange-500" />,
    definitions: [
      {
        type: "Definiciones",
        icon: <Lightbulb className="w-5 h-5 text-gray-700 dark:text-gray-100" />,
        items: [
          "Ideas, conocimientos, etc., que una persona transmite a otra. (Diccionario Espasa-Calpe, 2005)",
          "Forma de influencia interpersonal dirigida a cambiar el potencial de comportamiento de otra persona. (Gage, 1963, citado por Isola Rajagopalan, 2019)",
        ],
      },
      {
        type: "Definición propia",
        icon: <User className="w-5 h-5 text-gray-700 dark:text-gray-100" />,
        items: [
          "Proceso mediante el cual un docente proporciona herramientas y conocimientos al estudiante con el objetivo de fomentar su aprendizaje.",
        ],
      },
    ],
  },
  {
    title: "Educación",
    icon: <GraduationCap className="w-8 h-8 text-orange-500" />,
    definitions: [
      {
        type: "Definiciones",
        icon: <Lightbulb className="w-5 h-5 text-gray-700 dark:text-gray-100" />,
        items: [
          "Proceso de socialización y aprendizaje encaminado al desarrollo intelectual y ético de una persona. (Diccionario Espasa-Calpe, 2005)",
          "Ayudar al niño a realizar sus potencialidades. (Erich Fromm, 2016)",
        ],
      },
      {
        type: "Definición propia",
        icon: <User className="w-5 h-5 text-gray-700 dark:text-gray-100" />,
        items: [
          "Proceso constante mediante el cual un individuo adquiere conocimientos, valores y normas, guiado por su entorno, especialmente por la familia más cercana, docentes y su entorno social.",
        ],
      },
    ],
  },
]

const reflectionsData = [
  {
    title: "Sobre el Aprendizaje",
    text: "Coherente con la competencia. Integra la experiencia previa del alumno (Díaz Barriga) para ir más allá de la materia, fomentando una conciencia crítica y el respeto por la diversidad. El aprendizaje ya no es solo un proceso de conexión de saberes, sino la capacidad de movilizarlos para resolver problemas reales (Tardif, 2008).",
  },
  {
    title: "Sobre la Enseñanza",
    text: 'Se alinea con la competencia. Es una influencia interpersonal (Gage) que busca cambios éticos y significativos en la comprensión del mundo, formando una mirada crítica y respetuosa hacia otras culturas. En el marco competencial de la LOMLOE, el docente se centra en el diseño de "situaciones de aprendizaje" (Hilario Silva y Ortiz, 2023).',
  },
  {
    title: "Sobre la Educación",
    text: "Coherente con la competencia. Busca que los alumnos realicen su potencial (Fromm), convirtiéndolos en ciudadanos sensibles y reflexivos. Es una herramienta transformadora que combate estereotipos y fomenta el respeto por la diversidad cultural. La educación es el horizonte: la formación de futuros ciudadanos críticos.",
  },
]

const bibliographyData = [
  <>Beltrán, J., Hernández, F., & Montané, A. (2008). Tradición y modernidad en las políticas educativas en España. <em>Revista Iberoamericana de Educación</em>, (48), 53-71.</>,
  <>Fromm, E. (2016). <em>El arte de amar</em>. Paidós.</>,
  <>Hilario Silva, P., & Ortiz Aguirre, E. (2023). Las situaciones de aprendizaje en el área de Lengua Castellana y Literatura. <em>Supervisión 21: Revista de educación e inspección</em>, (68).</>,
  <>Isola Rajagopalan (2019). Concept of Teaching. <em>Shanlax International Journal of Education</em>, 7(2), 5-8.</>,
  <>Machorro Cabello, M. Á., & Valdez Fuentes, V. (2017). Orientaciones para el trabajo en el aula. <em>Boletín Científico de la Escuela Preparatoria No. 4</em>, 4(8).</>,
  <>Ortiz Aguirre, E. (2023). Aproximación crítica a las competencias clave y las competencias específicas de la LOMLOE. <em>Supervisión 21: Revista de educación e inspección</em>, (67).</>,
  <>Tardif, J. (2008). Desarrollo de un programa por competencias: De la intención a su implementación. <em>Profesorado. Revista de currículum y formación del profesorado</em>, 12(3).</>,
]

export default function ConceptMapPage() {
  const d3Container = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (d3Container.current) {
      const svg = d3.select(d3Container.current)
      const parent = d3Container.current.parentElement
      if (!parent) return

      const width = parent.clientWidth
      const height = parent.clientHeight

      // Clear previous SVG content
      svg.selectAll("*").remove()

      // Define the scale factor for node sizes based on container size
      const scaleFactor = Math.min(width, height) / 600

      // Define data for the nodes and links
      const data = {
        nodes: [
          // Central Node
          { id: "paradigma", label: "Paradigma Competencial", type: "central", radius: 60 * scaleFactor },
          // Main Concepts
          { id: "educacion", label: "Educación", type: "main", radius: 50 * scaleFactor },
          { id: "aprendizaje", label: "Aprendizaje", type: "main", radius: 50 * scaleFactor },
          { id: "ensenanza", label: "Enseñanza", type: "main", radius: 50 * scaleFactor },
          // Secondary Nodes - Education
          { id: "edu_horizonte", label: "Horizonte: Ciudadanos Críticos", type: "secondary", radius: 40 * scaleFactor },
          {
            id: "edu_potencialidades",
            label: "Realizar Potencialidades (Fromm)",
            type: "secondary",
            radius: 40 * scaleFactor,
          },
          { id: "edu_proceso", label: "Proceso Constante", type: "secondary", radius: 40 * scaleFactor },
          // Secondary Nodes - Learning
          { id: "apr_vehiculo", label: "Vehículo: Actuar Eficazmente", type: "secondary", radius: 40 * scaleFactor },
          {
            id: "apr_relacion",
            label: "Relación Sustantiva (Díaz Barriga)",
            type: "secondary",
            radius: 40 * scaleFactor,
          },
          { id: "apr_movilizar", label: "Movilizar Saberes (Tardif)", type: "secondary", radius: 40 * scaleFactor },
          { id: "apr_tradmod", label: "Tradición vs. Modernidad", type: "secondary", radius: 40 * scaleFactor },
          // Secondary Nodes - Teaching
          { id: "ens_motor", label: "Motor: Situaciones de Aprendizaje", type: "secondary", radius: 40 * scaleFactor },
          {
            id: "ens_influencia",
            label: "Influencia Interpersonal (Gage)",
            type: "secondary",
            radius: 40 * scaleFactor,
          },
          { id: "ens_diseno", label: "Diseño de Experiencias", type: "secondary", radius: 40 * scaleFactor },
          { id: "ens_desafios", label: "Desafíos Docentes", type: "secondary", radius: 40 * scaleFactor },
        ],
        links: [
          // Links from central node to main concepts
          { source: "paradigma", target: "educacion" },
          { source: "paradigma", target: "aprendizaje" },
          { source: "paradigma", target: "ensenanza" },
          // Links from main concepts to their secondary nodes
          { source: "educacion", target: "edu_horizonte" },
          { source: "educacion", target: "edu_potencialidades" },
          { source: "educacion", target: "edu_proceso" },
          { source: "aprendizaje", target: "apr_vehiculo" },
          { source: "aprendizaje", target: "apr_relacion" },
          { source: "aprendizaje", target: "apr_movilizar" },
          { source: "aprendizaje", target: "apr_tradmod" },
          { source: "ensenanza", target: "ens_motor" },
          { source: "ensenanza", target: "ens_influencia" },
          { source: "ensenanza", target: "ens_diseno" },
          { source: "ensenanza", target: "ens_desafios" },
          // Cross-cutting links to show interconnections as per the conclusion
          { source: "educacion", target: "aprendizaje" }, // Education is the horizon, Learning is the vehicle
          { source: "aprendizaje", target: "ensenanza" }, // Learning is fostered by Teaching
          { source: "ensenanza", target: "educacion" }, // Teaching contributes to Education
        ],
      }

      // Create a force simulation
      const simulation = d3
        .forceSimulation(data.nodes)
        .force(
          "link",
          d3
            .forceLink(data.links)
            .id((d: any) => d.id)
            .distance(120 * scaleFactor)
            .strength(0.7),
        )
        .force("charge", d3.forceManyBody().strength(-400 * scaleFactor))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force(
          "collide",
          d3
            .forceCollide()
            .radius((d: any) => d.radius * 1.2)
            .strength(0.8),
        )

      // Group for all map elements (for zoom and pan)
      const g = svg.append("g")

      // Draw the links
      const link = g
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("stroke", "#000000")
        .attr("stroke-width", 2)
        .attr("opacity", 0.6)

      // Draw the nodes (circles and text)
      const node = g
        .append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(data.nodes)
        .enter()
        .append("g")
        .attr("class", (d: any) => `node ${d.type}`)
        .call(d3.drag<any, any>().on("start", dragstarted).on("drag", dragged).on("end", dragended))

      node
        .append("circle")
        .attr("r", (d: any) => d.radius)
        .attr("stroke", "#000000")
        .attr("stroke-width", 2)
        .attr("fill", (d: any) => {
          if (d.type === "central") return "#FF8200"
          if (d.type === "main") return "#FFFFFF"
          return "#000000" // Secondary nodes
        })

      node
        .append("text")
        .text((d: any) => d.label)
        .attr("dy", "0.35em")
        .attr("fill", (d: any) => {
          if (d.type === "central" || d.type === "main") return "#000000"
          return "#FFB366" // Secondary nodes - naranja claro que contrasta bien con el fondo negro
        })
        .attr("font-size", (d: any) => {
          if (d.type === "central") return `${16 * scaleFactor}px`
          if (d.type === "main") return `${14 * scaleFactor}px`
          return `${12 * scaleFactor}px`
        })
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .call(wrapText, (d: any) => d.radius * 1.8)

      // Update element positions on each simulation tick
      simulation.on("tick", () => {
        link
          .attr("x1", (d: any) => d.source.x)
          .attr("y1", (d: any) => d.source.y)
          .attr("x2", (d: any) => d.target.x)
          .attr("y2", (d: any) => d.target.y)

        node.attr("transform", (d: any) => `translate(${d.x},${d.y})`)
      })

      // Drag functions
      function dragstarted(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      }

      function dragged(event: any, d: any) {
        d.fx = event.x
        d.fy = event.y
      }

      function dragended(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      }

      // Zoom and pan function
      const zoom = d3
        .zoom()
        .scaleExtent([0.1, 4])
        .on("zoom", (event) => {
          g.attr("transform", event.transform)
        })

      svg.call(zoom as any)

      // Function to wrap text within the circle
      function wrapText(textSelection: any, width: any) {
        textSelection.each(function () {
          const text = d3.select(this)
          const words = text.text().split(/\s+/).reverse()
          let word
          let line: string[] = []
          let lineNumber = 0
          const lineHeight = 1.1
          const y = text.attr("y")
          const dy = Number.parseFloat(text.attr("dy"))
          let tspan = text
            .text(null)
            .append("tspan")
            .attr("x", 0)
            .attr("y", y)
            .attr("dy", dy + "em")

          while ((word = words.pop())) {
            line.push(word)
            tspan.text(line.join(" "))
            if (tspan.node()?.getComputedTextLength() > width && line.length > 1) {
              line.pop()
              tspan.text(line.join(" "))
              line = [word]
              tspan = text
                .append("tspan")
                .attr("x", 0)
                .attr("y", y)
                .attr("dy", ++lineNumber * lineHeight + dy + "em")
                .text(word)
            }
          }

          // Vertically center text if multiple lines
          const numLines = text.selectAll("tspan").size()
          if (numLines > 1) {
            text
              .selectAll("tspan")
              .attr(
                "y",
                (d: any, i: number) =>
                  y - (((numLines - 1) * lineHeight) / 2) * (Number.parseFloat(text.attr("font-size")) || 12),
              )
          }
        })
      }

      // Handle window resize
      const handleResize = () => {
        if (!parent) return
        const newWidth = parent.clientWidth
        const newHeight = parent.clientHeight
        const newScaleFactor = Math.min(newWidth, newHeight) / 600

        // Update simulation dimensions
        simulation.force("center", d3.forceCenter(newWidth / 2, newHeight / 2))

        // Update node radii
        node.selectAll("circle").attr("r", (d: any) => d.radius * (newScaleFactor / scaleFactor))

        // Update text wrapping
        node
          .selectAll("text")
          .attr("font-size", (d: any) => {
            if (d.type === "central") return `${16 * newScaleFactor}px`
            if (d.type === "main") return `${14 * newScaleFactor}px`
            return `${12 * newScaleFactor}px`
          })
          .call(wrapText, (d: any) => d.radius * (newScaleFactor / scaleFactor) * 1.8)

        // Restart simulation with new forces
        simulation.alpha(1).restart()
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 sm:p-8 flex flex-col items-center font-sans">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 dark:text-orange-400 mb-2">
          Mapa conceptual
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-400">
          sobre la triada Aprendizaje, Enseñanza y Educación en el actual escenario de competencias
        </p>
      </header>

      {/* Concept Definitions Section */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-center items-stretch gap-8 mb-16">
        {conceptsData.map((concept, conceptIndex) => (
          <div
            key={conceptIndex}
            className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-3xl shadow-lg border-t-4 border-orange-500 dark:border-orange-400 transition-transform duration-300 hover:scale-105 transform hover:shadow-2xl flex-1 min-w-[280px]"
          >
            <div className="flex items-center justify-center p-4 bg-orange-100 dark:bg-gray-700 rounded-full mb-4">
              {concept.icon}
            </div>
            <h2 className="text-2xl font-bold mb-4 text-orange-600 dark:text-orange-400">{concept.title}</h2>
            <div className="w-full h-px bg-gray-300 dark:bg-gray-700 mb-6"></div>
            {concept.definitions.map((definition, defIndex) => (
              <div key={defIndex} className="w-full mb-6">
                <h3 className="flex items-center justify-center text-md font-semibold text-gray-700 dark:text-gray-100 mb-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-xl">
                  {definition.icon}
                  <span className="ml-2">{definition.type}</span>
                </h3>
                <ul className="text-left text-sm space-y-2">
                  {definition.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-inner transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Reflections Section */}
      <section className="w-full max-w-7xl mb-16">
        <h2 className="text-3xl font-extrabold text-orange-600 dark:text-orange-400 text-center mb-8 flex items-center justify-center gap-2">
          <Brain className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          Reflexiones
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reflectionsData.map((reflection, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 p-6 rounded-3xl shadow-lg border-t-4 border-gray-400 dark:border-gray-500 transition-transform duration-300 hover:scale-105 transform hover:shadow-2xl"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{reflection.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 text-left">{reflection.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* D3.js Concept Map Section */}
      <section className="w-full max-w-7xl">
        <h2 className="text-3xl font-extrabold text-orange-600 dark:text-orange-400 text-center mb-8 flex items-center justify-center gap-2">
          <Settings className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          Mapa Conceptual Interactivo
        </h2>
        <div className="relative w-full h-[600px] md:h-[400px] border-radius-15 overflow-hidden bg-white shadow-lg mb-8 rounded-2xl">
          <svg ref={d3Container} className="w-full h-full block"></svg>
          <div className="absolute bottom-5 right-5 bg-white/90 p-3 rounded-lg shadow-md text-sm text-black">
            <div className="flex items-center mb-2">
              <div className="w-5 h-5 bg-orange-500 rounded border border-black mr-3"></div>
              <span>Concepto Central</span>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-5 h-5 bg-white rounded border border-black mr-3"></div>
              <span>Elementos de la tríada</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-black rounded border border-black mr-3"></div>
              <span>Componentes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bibliography Section */}
      <section className="w-full max-w-7xl mt-8 p-6 bg-gray-100 dark:bg-gray-900 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-extrabold text-orange-600 dark:text-orange-400 mb-6 text-center">
          Referencias Bibliográficas
        </h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 text-sm">
          {bibliographyData.map((ref, index) => (
            <li key={index}>{ref}</li>
          ))}
        </ul>
      </section>

      {/* Footer Section */}
      <footer className="w-full max-w-7xl mt-16 pt-8 border-t border-gray-300 dark:border-gray-700">
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          Realizado por Alejandro Corral Ríos, Cira Carmen Feo Merino, Claudia Gallarreta Peña y Rocío Ruiz Carrera.
        </p>
      </footer>
    </div>
  )
}
