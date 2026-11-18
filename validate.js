const fs = require('fs');
const path = require('path');

const VALID_TYPES = ['direct_activation', 'application_required', 'high_bar'];
const VALID_CATEGORIES = ['ide', 'containers', 'monitoring', 'security_scanning', 'code_quality', 'password_management', 'ai_tools'];
const REQUIRED_LANGS = ['zh-Hant', 'zh-Hans', 'en'];
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const URL_REGEX = /^https?:\/\/.+/;

let hasErrors = false;

function error(message) {
    console.error(`❌ ERROR: ${message}`);
    hasErrors = true;
}

function success(message) {
    console.log(`✅ ${message}`);
}

function validateProgram(program, index) {
    const programId = `Program #${index + 1}${program.name ? ` (${program.name})` : ''}`;
    
    // Check required fields exist
    if (!program.name) {
        error(`${programId}: Missing 'name' field`);
    } else {
        success(`${programId}: Has name`);
    }
    
    // Validate whatYouGet
    if (!program.whatYouGet || typeof program.whatYouGet !== 'object') {
        error(`${programId}: Missing or invalid 'whatYouGet' field`);
    } else {
        REQUIRED_LANGS.forEach(lang => {
            if (!program.whatYouGet[lang] || typeof program.whatYouGet[lang] !== 'string' || program.whatYouGet[lang].trim() === '') {
                error(`${programId}: Missing or empty 'whatYouGet.${lang}'`);
            }
        });
        if (program.whatYouGet['zh-Hant'] && program.whatYouGet['zh-Hans'] && program.whatYouGet['en']) {
            success(`${programId}: All three languages present in whatYouGet`);
        }
    }
    
    // Validate requirements
    if (!program.requirements || typeof program.requirements !== 'object') {
        error(`${programId}: Missing or invalid 'requirements' field`);
    } else {
        REQUIRED_LANGS.forEach(lang => {
            if (!program.requirements[lang] || typeof program.requirements[lang] !== 'string' || program.requirements[lang].trim() === '') {
                error(`${programId}: Missing or empty 'requirements.${lang}'`);
            }
        });
        if (program.requirements['zh-Hant'] && program.requirements['zh-Hans'] && program.requirements['en']) {
            success(`${programId}: All three languages present in requirements`);
        }
    }
    
    // Validate type
    if (!program.type) {
        error(`${programId}: Missing 'type' field`);
    } else if (!VALID_TYPES.includes(program.type)) {
        error(`${programId}: Invalid 'type' value '${program.type}'. Must be one of: ${VALID_TYPES.join(', ')}`);
    } else {
        success(`${programId}: Valid type '${program.type}'`);
    }
    
    // Validate category
    if (!program.category || !Array.isArray(program.category)) {
        error(`${programId}: Missing or invalid 'category' field (must be an array)`);
    } else if (program.category.length === 0) {
        error(`${programId}: 'category' array is empty (must have at least one category)`);
    } else {
        const invalidCategories = program.category.filter(cat => !VALID_CATEGORIES.includes(cat));
        if (invalidCategories.length > 0) {
            error(`${programId}: Invalid categories: ${invalidCategories.join(', ')}. Valid categories are: ${VALID_CATEGORIES.join(', ')}`);
        } else {
            success(`${programId}: Valid categories: ${program.category.join(', ')}`);
        }
    }
    
    // Validate link
    if (!program.link) {
        error(`${programId}: Missing 'link' field`);
    } else if (!URL_REGEX.test(program.link)) {
        error(`${programId}: Invalid 'link' URL: ${program.link}`);
    } else {
        success(`${programId}: Valid link`);
    }
    
    // Validate lastVerified
    if (!program.lastVerified) {
        error(`${programId}: Missing 'lastVerified' field`);
    } else if (!DATE_REGEX.test(program.lastVerified)) {
        error(`${programId}: Invalid 'lastVerified' date format '${program.lastVerified}'. Must be YYYY-MM-DD`);
    } else {
        success(`${programId}: Valid lastVerified date: ${program.lastVerified}`);
    }
}

function main() {
    console.log('🔍 Validating public/data/programs.json...\n');
    
    const filePath = path.join(__dirname, 'public', 'data', 'programs.json');
    
    if (!fs.existsSync(filePath)) {
        error('data/programs.json file not found');
        process.exit(1);
    }
    
    let data;
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        data = JSON.parse(content);
    } catch (err) {
        error(`Failed to parse JSON: ${err.message}`);
        process.exit(1);
    }
    
    if (!Array.isArray(data)) {
        error('JSON root must be an array');
        process.exit(1);
    }
    
    success(`Found ${data.length} programs\n`);
    
    data.forEach((program, index) => {
        console.log(`\n--- Validating ${program.name || `Program #${index + 1}`} ---`);
        validateProgram(program, index);
    });
    
    console.log('\n' + '='.repeat(60));
    if (hasErrors) {
        console.error('\n❌ Validation FAILED. Please fix the errors above.\n');
        process.exit(1);
    } else {
        console.log('\n✅ All validations PASSED!\n');
        process.exit(0);
    }
}

main();
