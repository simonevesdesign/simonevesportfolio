import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', 'span', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description: 'URL slug for detail page, e.g. "quest-workforce"',
      },
    },
    {
      name: 'hasDetail',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Enable detail page link at /work/[slug]',
      },
    },
    {
      name: 'index',
      type: 'text',
      required: true,
      admin: {
        description: 'Display index, e.g. "01 / Featured" or "02"',
      },
    },
    {
      name: 'type',
      type: 'text',
      required: true,
      admin: {
        description: 'Pill label, e.g. "SaaS Platform"',
      },
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      admin: {
        description: 'Accent line, e.g. "Multi-tenant SaaS"',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'filterTags',
      type: 'array',
      admin: {
        description: 'Used for filter bar: full-stack, saas, ecommerce, wordpress, design, ai, print',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'link',
      type: 'text',
    },
    {
      name: 'linkText',
      type: 'text',
      defaultValue: 'Case study',
    },
    {
      name: 'year',
      type: 'text',
      required: true,
    },
    {
      name: 'span',
      type: 'select',
      required: true,
      defaultValue: '4',
      options: [
        { label: 'Span 8 (featured wide)', value: '8' },
        { label: 'Span 6 (half wide)', value: '6' },
        { label: 'Span 4 (standard)', value: '4' },
      ],
    },
    {
      name: 'thumbLabel',
      type: 'text',
      admin: {
        description: 'Label shown on placeholder thumbnail',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      required: true,
      defaultValue: 99,
    },
  ],
}
