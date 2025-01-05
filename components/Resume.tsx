"use client"

import React, { useRef } from 'react';
import { resumeData } from '../data/resumeData';
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Linkedin, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const iconMap = {
  MapPin,
  Phone,
  Mail,
  Linkedin
};

export default function Resume() {
  const resumeRef = useRef<HTMLDivElement>(null);

  const downloadPDF = () => {
    const element = resumeRef.current;
    if (!element) return;

    const opt = {
      margin: 5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-[21cm] mx-auto">
        <Button 
          onClick={downloadPDF}
          className="mb-4 fixed top-4 right-4 z-10"
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>

        <div ref={resumeRef}  contentEditable="true" className="bg-white p-6 shadow-lg text-[10px] leading-tight">
          <header className="text-center mb-4">
            <h1 className="text-2xl font-bold mb-1" contentEditable="true">{resumeData.name}</h1>
            <p className="text-sm text-gray-600 mb-2">{resumeData.title}</p>
            <div className="flex justify-center gap-2 text-[9px] text-gray-600 flex-wrap">
              {resumeData.contact.map((item, index) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap];
                return (
                  <div key={index} className="flex items-center">
                    <Icon className="w-2 h-2 mr-1" />
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {item.text}
                      </a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </header>

          <section className="mb-3">
            <p className="text-[9px] text-gray-700">{resumeData.summary}</p>
          </section>

          <section className="mb-3">
            <h2 className="text-sm font-bold mb-2 uppercase border-b border-gray-300 pb-1">Professional Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold">{exp.company}, {exp.location}</h3>
                    <p className="text-[9px] text-gray-600 italic">{exp.position}</p>
                  </div>
                  <span className="text-[9px] text-gray-600">{exp.period}</span>
                </div>
                <ul className="list-disc list-outside text-[9px] text-gray-700 ml-3 pl-1">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="mb-0.5">{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="mb-3">
            <h2 className="text-sm font-bold mb-2 uppercase border-b border-gray-300 pb-1">Projects</h2>
            <div className="grid grid-cols-1 gap-2"> {/* Updated grid layout */}
              {resumeData.projects.map((project, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-bold text-[11px] flex justify-between  mb-0.5"> {/* Updated font size */}
                    {project.name}
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1 text-[8px]">
                      {project.url}
                    </a>
                  </h3>
                  <p className="text-[9px] text-gray-600 mb-0.5">Role: {project.role}</p>
                  <p className="text-[9px] text-gray-600 mb-0.5">
                    Technologies: {project.technologies.join(", ")}
                  </p>
                  <p className="text-[9px] text-gray-700">{project.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-3">
            <h2 className="text-sm font-bold mb-2 uppercase border-b border-gray-300 pb-1">Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index}>
                <h3 className="font-bold text-[10px]">{edu.degree}</h3>
                <p className="text-[9px] text-gray-700">
                  {edu.status} at {edu.school}, {edu.location}
                </p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-sm font-bold mb-2 uppercase border-b border-gray-300 pb-1">Key Skills</h2>
            <div className="grid grid-cols-2 gap-2">
              {resumeData.skills.map((skill, index) => (
                <div key={index}>
                  <p className="font-bold text-[9px] mb-0.5">{skill.category}:</p>
                  <p className="text-[9px] text-gray-700">{skill.items.join(", ")}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

